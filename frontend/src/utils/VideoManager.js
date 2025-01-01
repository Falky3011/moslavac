const MAX_VIDEOS = 4;

export function addVideo(videos, newVideo) {
    const updatedVideos = [newVideo, ...videos.slice(0, MAX_VIDEOS - 1)];
    return updatedVideos;
}

export function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
}
