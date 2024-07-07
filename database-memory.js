import { randomUUID } from "crypto";

export class DatabaseMemory {
  #videos = [];
 
  create(video) {
    const videoId = randomUUID();
  
    const objVideo = {
      id: videoId,
      ...video
    };

    this.#videos.push(objVideo);
  }

  read(search) {
    if (search) {
      const listVideos = [];
      for (const video of this.#videos) {
        if (video.title.includes(search)) {
          listVideos.push(video);
        }
      }
      return listVideos;
    }
    return this.#videos;
  }

  update(id, video) {
    for (let item in this.#videos) {
      const videoArray = this.#videos[item];
      if (videoArray.id === id) {

        this.#videos[item] = {
          id,
          ...video
        };
      }
    }
  }

  delete(id) {
    for (let item in this.#videos) {
      const videoArray = this.#videos[item];
      if (videoArray.id === id) {
        delete this.#videos[item];
      }
    }
  }
}