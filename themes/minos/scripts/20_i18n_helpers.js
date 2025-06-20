const i18n = require('../lib/i18n')(hexo);
const path = require('path');

// 注册 display_languages helper
hexo.extend.helper.register('display_languages', function() {
  return i18n.getDisplayLanguages();
});

// 注册 page_language helper
hexo.extend.helper.register('page_language', function(page) {
  if (!page) page = this.page;
  return i18n.getPageLanguage(page) || i18n.getDisplayLanguages()[0] || 'default';
});

// 注册 is_default_language helper
hexo.extend.helper.register('is_default_language', function(language) {
  if (!language) language = this.page_language();
  return i18n.isDefaultLanguage(language);
});

// 注册 rfc5646 helper
hexo.extend.helper.register('rfc5646', function(language) {
  if (!language) language = this.page_language();
  return i18n.formatRfc5646(language);
});

// 注册 i18n_path helper
hexo.extend.helper.register('i18n_path', function(language) {
  // 生成多语言路径
  let url = this.url_for('/');
  if (language && !i18n.isDefaultLanguage(language)) {
    url = path.join('/', language, '/');
  }
  return url;
});

// 注册 language_name helper（简单返回语言代码，可自定义映射）
hexo.extend.helper.register('language_name', function(language) {
  // 你可以根据需要自定义语言名称映射
  const map = {
    'zh-cn': '简体中文',
    'zh-tw': '繁體中文',
    'en': 'English',
    'default': 'Default'
  };
  return map[language] || language;
});
