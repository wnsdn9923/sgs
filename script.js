// 특정 YouTube 채널에서 최신 영상을 가져오는 함수
async function fetchLatestVideos(apiKey, channelId, maxResults = 4) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
}

// YouTube에서 검색어에 따른 영상을 검색하는 함수
async function searchVideos() {
  const query = document.getElementById('search-input').value; // 입력 필드에서 검색어 가져오기
  const apiKey = 'AIzaSyCcVHkDnh5oujS17VxrDdGo5PV7FNjdpdA'; // 자신의 YouTube Data API 키로 변경하세요
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${encodeURIComponent(query)}&part=snippet&type=video&maxResults=4`;
  const response = await fetch(url);
  const data = await response.json();
  displaySearchResults(data.items); // 검색 결과를 화면에 표시
}

// 검색 결과를 화면에 표시하는 함수
function displaySearchResults(videos) {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = ''; // 기존 검색 결과 지우기
  videos.forEach(video => {
    const videoCard = document.createElement('a');
    videoCard.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    videoCard.target = '_blank';
    videoCard.className = 'video-card';

    const img = document.createElement('img');
    img.src = video.snippet.thumbnails.high.url;
    img.alt = video.snippet.title;

    videoCard.appendChild(img);
    searchResults.appendChild(videoCard);
  });
}

// 특정 지역에서 인기 있는 영상을 가져오는 함수
async function fetchPopularVideos(apiKey, maxResults = 12) {
  const url = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=KR&maxResults=${maxResults}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
}

// 인기 있는 영상을 화면에 표시하는 함수
function displayPopularVideos(videos) {
  const youtubeVideos = document.getElementById('youtube-videos');
  youtubeVideos.innerHTML = ''; // 기존 비디오 지우기
  videos.forEach(video => {
    const videoCard = document.createElement('a'); // 'div'에서 'a' 태그로 변경
    videoCard.href = `https://www.youtube.com/watch?v=${video.id}`;
    videoCard.target = '_blank';
    videoCard.className = 'video-card';

    const img = document.createElement('img');
    img.src = video.snippet.thumbnails.high.url;
    img.alt = video.snippet.title;

    const title = document.createElement('p');
    title.className = 'video-title';
    title.textContent = video.snippet.title;

    const channel = document.createElement('p');
    channel.className = 'video-channel';
    channel.textContent = video.snippet.channelTitle;

    videoCard.appendChild(img);
    videoCard.appendChild(title);
    videoCard.appendChild(channel);

    youtubeVideos.appendChild(videoCard);
  });
}

// DOM이 완전히 로드된 후 실행되는 함수
document.addEventListener('DOMContentLoaded', async () => {
  const apiKey = 'AIzaSyCcVHkDnh5oujS17VxrDdGo5PV7FNjdpdA'; // 자신의 YouTube Data API 키로 변경하세요
  const popularVideos = await fetchPopularVideos(apiKey);
  displayPopularVideos(popularVideos);
});

// 사용자의 상호작용에 따라 특정 섹션을 표시하는 함수
function showSection(sectionId, tags) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');

  // 첫 화면 숨기기
  document.getElementById('introduction').style.display = 'none';

  const tagCloud = document.getElementById('tag-cloud');
  tagCloud.innerHTML = '';
  tags.forEach(tag => {
    const span = document.createElement('span');
    span.textContent = tag;
    tagCloud.appendChild(span);
  });
}

// 소개 섹션을 표시하는 함수
function showIntroduction() {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById('introduction').classList.add('active');

  const tagCloud = document.getElementById('tag-cloud');
  tagCloud.innerHTML = '';
  const defaultTags = ['Supernova', 'How Sweet', 'HEYA', 'Magnetic', 'Perfect Night', 'Fate'];
  defaultTags.forEach(tag => {
    const span = document.createElement('span');
    span.textContent = tag;
    tagCloud.appendChild(span);
  });

  // 첫 화면 보이기
  document.getElementById('introduction').style.display = 'flex';
}
