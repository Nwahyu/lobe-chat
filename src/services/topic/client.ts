import { clientDB } from '@/database/client/db';
import { TopicModel } from '@/database/server/models/topic';
import { useUserStore } from '@/store/user';
import { userProfileSelectors } from '@/store/user/selectors';
import { ChatTopic } from '@/types/topic';

import { CreateTopicParams, ITopicService, QueryTopicParams } from './type';

export class ClientService implements ITopicService {
  private topicModel: TopicModel;
  constructor() {
    const userId = userProfileSelectors.userId(useUserStore.getState())!;

    this.topicModel = new TopicModel(clientDB, userId);
  }

  async createTopic(params: CreateTopicParams): Promise<string> {
    const item = await this.topicModel.create(params as any);

    if (!item) {
      throw new Error('topic create Error');
    }

    return item.id;
  }

  async batchCreateTopics(importTopics: ChatTopic[]) {
    const data = await this.topicModel.batchCreate(importTopics as any);

    return { added: data.length, ids: [], skips: [], success: true };
  }

  async cloneTopic(id: string, newTitle?: string) {
    const data = await this.topicModel.duplicate(id, newTitle);
    return data.topic.id;
  }

  async getTopics(params: QueryTopicParams): Promise<ChatTopic[]> {
    console.log('get',params);
    const data = await this.topicModel.query(params);
    console.log('topic:', data);
    return data;
  }

  async searchTopics(keyword: string, sessionId?: string) {
    return this.topicModel.queryByKeyword(keyword, sessionId);
  }

  async getAllTopics() {
    return this.topicModel.queryAll();
  }

  async countTopics() {
    return this.topicModel.count();
  }

  async updateTopic(id: string, data: Partial<ChatTopic>) {
    return this.topicModel.update(id, data);
  }

  async removeTopic(id: string) {
    return this.topicModel.delete(id);
  }

  async removeTopics(sessionId: string) {
    return this.topicModel.batchDeleteBySessionId(sessionId);
  }

  async batchRemoveTopics(topics: string[]) {
    return this.topicModel.batchDelete(topics);
  }

  async removeAllTopic() {
    return this.topicModel.deleteAll();
  }
}
