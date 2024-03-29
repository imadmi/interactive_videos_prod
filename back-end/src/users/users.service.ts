import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { create } from 'domain';
import { JWT_SECRET } from 'src/constants';
import { VideoAsk } from './types';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService) {}

  async importVideoAsks(data: VideoAsk[], userId: number | null) {
    try {
      if (userId === null) {
        return { success: false, error: 'Login first' };
      }

      data = data.map((videoAsk) => {
        const date = Date.now();
        videoAsk.id = videoAsk.id + '-' + date;
        videoAsk.questions = videoAsk.questions.map((q) => {
          q.next_video_id = q.next_video_id + '-' + date;
          return q;
        });
        return videoAsk;
      });

      const videoAsks = await prisma.videoAsk.findMany({
        where: {
          id: {
            in: data.map((v) => v.id),
          },
        },
      });
      if (videoAsks.length) {
        return { success: false, error: 'duplicated Ids' };
      }

      // create a user with id = 1
      await prisma.user.create({
        data: {
          id: 1,
          email: '',
          name: '',
          password: '',
        },
      });

      for (const [index, videoAsk] of data.entries()) {
        const questions = videoAsk.questions.map((q) => ({
          question: q.question,
          next_video_id: q.next_video_id,
          audioUrl: q.audioUrl,
          redirectUrl: q.redirectUrl,
        }));
        if (index === 0 && userId !== null) {
          await prisma.videoAsk.create({
            data: {
              id: videoAsk.id,
              title: videoAsk.title,
              url: videoAsk.url,
              questions: {
                create: questions,
              },
              userId: userId,
            },
          });
        } else {
          await prisma.videoAsk.create({
            data: {
              id: videoAsk.id,
              title: videoAsk.title,
              url: videoAsk.url,
              questions: {
                create: questions,
              },
              userId: null,
            },
          });
        }
      }
      return { success: true };
    } catch (error) {
      console.error('Error importing video asks:', error);
      return { success: false, error: error };
    }
  }

  async getVideoAsk(id: string) {
    const videoAsk = await prisma.videoAsk.findUnique({
      where: {
        id,
      },
      include: {
        questions: true,
      },
    });
    if (!videoAsk) {
      return null;
    }

    return {
      id: videoAsk.id,
      title: videoAsk.title,
      url: videoAsk.url,
      questions: videoAsk.questions.map((q) => ({
        id: q.id,
        question: q.question,
        next_video_id: q.next_video_id,
      })),
    };
  }

  async getVideoAskChain(id: string) {
    // Initial lookup for the starting video ask
    let currentVideoAsk = await prisma.videoAsk.findUnique({
      where: {
        id,
      },
      include: {
        questions: true,
      },
    });

    // Return null if the starting video ask is not found
    if (!currentVideoAsk) {
      return null;
    }

    let videoChain: any[] = [];

    // Loop to follow the chain of video asks
    while (currentVideoAsk) {
      // Add the current video ask to the chain
      videoChain.push({
        id: currentVideoAsk.id,
        title: currentVideoAsk.title,
        url: currentVideoAsk.url,
        questions: currentVideoAsk.questions.map((q) => ({
          id: q.id,
          question: q.question,
          next_video_id: q.next_video_id,
        })),
      });

      // Get the next_video_id from the first question
      const nextId = currentVideoAsk.questions[0]?.next_video_id;

      // Break the loop if there is no next video
      if (!nextId) {
        break;
      }

      currentVideoAsk = await prisma.videoAsk.findUnique({
        where: {
          id: nextId,
        },
        include: {
          questions: true,
        },
      });
    }

    return videoChain;
  }

  async getVideoAsks() {
    return await prisma.videoAsk.findMany({
      include: {
        questions: true,
      },
    });
  }

  // get all video asks withouth Id and questions id
  async getVideoAskswithoutId() {
    const videoAsks = await this.getVideoAsks();
    return videoAsks.map((videoAsk) => {
      return {
        id: videoAsk.id,
        title: videoAsk.title,
        url: videoAsk.url,
        questions: videoAsk.questions.map((q) => ({
          question: q.question,
          audioUrl: q.audioUrl,
          next_video_id: q.next_video_id,
        })),
      };
    });
  }

  getUserFromCookie(cookie: any): User | null {
    const jwt = cookie.jwt;
    if (jwt === undefined) {
      return null;
    }
    try {
      const payload = this.jwtService.verify(jwt, {
        secret: JWT_SECRET,
      });

      const user = payload.user;
      if (user === null) {
        return null;
      }
      return user;
    } catch (e) {
      return null;
    }
  }

  async getVideoAsksByUser(userId: number) {
    try {
      const myvideos = await prisma.videoAsk.findMany({
        where: {
          userId,
        },
      });
      return myvideos;
    } catch (e) {
      return null;
    }
  }
}
