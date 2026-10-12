function YouTubeEmbed({ url, title }) {
  if (!url || !url.trim()) {
    return <div className="missing-video">No overview video added yet.</div>;
  }

  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  const videoId = match ? match[1] : null;

  if (!videoId) {
    return (
      <div className="missing-video">
        <a className="secondary-button small-button" href={url} target="_blank" rel="noopener noreferrer">
          Watch related videos on YouTube
        </a>
      </div>
    );
  }

  return (
    <div className="video-frame">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || 'Experiment overview video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default YouTubeEmbed;
