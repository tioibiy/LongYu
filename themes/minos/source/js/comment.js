// KaTeX for math rendering
// 依赖 marked、katex、auto-render 已在 ejs 中引入
const workerApi = 'https://api.long-yu.net';

function loadOiWikiComments(blockId) {
  const key = location.pathname + '#' + blockId;
  fetch(`${workerApi}/comment?key=${encodeURIComponent(key)}`)
    .then(r => r.json())
    .then(res => {
      const list = document.getElementById('comment-list');
      if (!res || !res.length) {
        list.innerHTML = '<div style="color:#888;text-align:center;margin-top:32px;">暂无评论</div>';
        return;
      }
      list.innerHTML = res.map(c => `
        <div class="comment-item">
          <span class="comment-nick">${c.nick || '匿名'}</span>
          <span class="comment-date">${c.date ? new Date(c.date).toLocaleDateString() : ''}</span>
          <div class="comment-content">${window.marked.parse((c.content || '').replace(/\r?\n/g, '\n'))}</div>
        </div>
      `).join('');
      // 渲染评论区的数学公式
      if (window.renderMathInElement) {
        renderMathInElement(list, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
          ],
          throwOnError: false
        });
      }
    })
    .catch(err => {
      const list = document.getElementById('comment-list');
      list.innerHTML = '<div style="color:#e00;text-align:center;margin-top:32px;">评论服务连接失败，请稍后再试</div>';
    });
}

function submitOiWikiComment(blockId) {
  const nick = document.getElementById('nick').value.trim();
  const content = document.getElementById('content').value.trim();
  if (!nick || !content) {
    alert('昵称和评论内容不能为空');
    return;
  }
  const key = location.pathname + '#' + blockId;
  fetch(`${workerApi}/comment?key=${encodeURIComponent(key)}`, {
    method: 'POST',
    body: JSON.stringify({ nick, content }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(() => {
    document.getElementById('content').value = '';
    loadOiWikiComments(blockId);
  })
  .catch(() => {
    alert('评论服务连接失败，请稍后再试');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const blocks = document.querySelectorAll('article ol > li');
  const drawer = document.getElementById('twikoo-comment-drawer');
  const drawerContent = drawer.querySelector('.twikoo-drawer-content');
  const drawerClose = drawer.querySelector('.twikoo-drawer-close');

  blocks.forEach((block, idx) => {
    const blockId = 'block-ol-' + idx;
    block.setAttribute('data-twikoo-block', blockId);
    const btn = document.createElement('button');
    btn.className = 'twikoo-comment-btn';
    btn.title = '评论';
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="iconify-icon iconify-inline" width="1em" height="1em" viewBox="0 0 24 24"><path d="M11 11v2q0 .425.288.713T12 14t.713-.288T13 13v-2h2q.425 0 .713-.288T16 10t-.288-.712T15 9h-2V7q0-.425-.288-.712T12 6t-.712.288T11 7v2H9q-.425 0-.712.288T8 10t.288.713T9 11zm-5 7l-2.3 2.3q-.475.475-1.088.213T2 19.575V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-.85-2H20V4H4v13.125zM4 16V4z" fill="currentColor"/></svg>`;
    btn.onclick = function (e) {
      e.stopPropagation();
      showOiWikiCommentDrawer(blockId);
    };
    block.appendChild(btn);
  });

  drawerClose.onclick = function () {
    drawer.classList.remove('active');
  };

  function showOiWikiCommentDrawer(blockId) {
    drawer.classList.add('active');
    document.getElementById('content').value = '';
    loadOiWikiComments(blockId);
    document.getElementById('send').onclick = function() {
      submitOiWikiComment(blockId);
    };
  }

  document.addEventListener('click', function(e) {
    if (drawer.classList.contains('active') && !drawer.contains(e.target) && !e.target.classList.contains('twikoo-comment-btn')) {
      drawer.classList.remove('active');
    }
  });
});
