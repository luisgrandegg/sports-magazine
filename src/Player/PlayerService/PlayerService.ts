/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlayerRepository } from '../PlayerRepository';

export class PlayerService {
  private playerRepository: PlayerRepository;

  constructor(playerRepository: PlayerRepository) {
    this.playerRepository = playerRepository;
  }

  async get(): Promise<any[]> {
    return await this.playerRepository.getAllPlayers();
  }

  async getOne(playerId: string): Promise<any> {
    return await this.playerRepository.getPlayerById(playerId);
  }

  async getHeatmap(playerId: string): Promise<any> {
    return await this.playerRepository.getPlayerHeatmapData(playerId);
  }
}
