/* Simple markdown rendering helper using marked.js */

(function (global) {
    'use strict';

    function applyBlogImageLayout(container) {
        if (!container || !container.querySelectorAll) {
            return;
        }

        var images = container.querySelectorAll('img');
        for (var i = 0; i < images.length; i++) {
            var img = images[i];

            // Use DOM values to avoid any marked renderer signature quirks.
            var alt = img.getAttribute('alt');
            var titleAttr = img.getAttribute('title');

            var layout = parseImageLayout(alt) || parseImageLayout(titleAttr);

            img.classList.add('blog-img');

            if (layout) {
                img.classList.add('img-block');
                img.classList.add('align-' + layout.align);
                img.style.width = layout.pct + '%';
                img.style.maxWidth = '100%';
            }

            img.setAttribute(
                'data-blog-img-layout',
                layout ? layout.pct + '-' + layout.align : 'none'
            );
        }
    }

    function parseImageLayout(title) {
        if (title === null || title === undefined) {
            return null;
        }

        // Be defensive: alt/title text might contain quotes/punctuation.
        var raw = ('' + title).trim().toLowerCase();
        if (!raw) {
            return null;
        }

        raw = raw.replace(/["'“”‘’]/g, '');
        raw = raw.replace(/^\(+/, '').replace(/\)+$/, '');
        raw = raw.replace(/[^a-z0-9%\-\s]/g, '');

        // Extract percentage if present (e.g. "50% right").
        var pctMatch = raw.match(/(\d{1,3})\s*%/);
        var pct = pctMatch ? parseInt(pctMatch[1], 10) : null;

        // Alignment hints.
        var align = null;
        if (raw.indexOf('left') !== -1) {
            align = 'left';
        } else if (raw.indexOf('right') !== -1) {
            align = 'right';
        } else if (raw.indexOf('center') !== -1 || raw.indexOf('centre') !== -1) {
            align = 'center';
        }

        // Keyword presets.
        if (pct === null) {
            // Accept "full" / "half" anywhere in the string.
            if (raw.indexOf('full') !== -1 || raw === '100' || raw === '100%') {
                pct = 100;
            } else if (raw.indexOf('half') !== -1 || raw === '50' || raw === '50%') {
                pct = 50;

                // Also support "half-left", "half-right", "half-center", "half-centre".
                var halfMatch = raw.match(/half-(left|right|center|centre)/);
                if (halfMatch) {
                    align = halfMatch[1] === 'centre' ? 'center' : halfMatch[1];
                }
            }
        }

        if (pct === null) {
            return null;
        }

        if (!align) {
            align = 'center';
        }

        // Clamp for safety.
        if (pct < 1) {
            pct = 1;
        } else if (pct > 100) {
            pct = 100;
        }

        return { pct: pct, align: align };
    }

    function parseFrontMatter(text) {
        var frontMatter = {};
        var content = text;

        if (text.indexOf('---') === 0) {
            var end = text.indexOf('---', 3);
            if (end !== -1) {
                var fmBlock = text.substring(3, end).trim();
                content = text.substring(end + 3).trim();

                fmBlock.split('\n').forEach(function (line) {
                    var parts = line.split(':');
                    if (parts.length >= 2) {
                        var key = parts[0].trim();
                        var value = parts.slice(1).join(':').trim();
                        frontMatter[key] = value;
                    }
                });
            }
        }

        return {
            frontMatter: frontMatter,
            content: content
        };
    }

    function renderMarkdownFromPath(markdownPath, container, callback) {
        var target =
            typeof container === 'string'
                ? document.getElementById(container)
                : container;

        if (!target) {
            // Nothing to render into; fail silently.
            return;
        }

        fetch(markdownPath)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Failed to load markdown: ' + markdownPath + ' (Status: ' + response.status + ')');
                }
                return response.text();
            })
            .then(function (text) {
                var parsed = parseFrontMatter(text);
                var html = '';

                var renderer = null;
                if (global.marked && typeof global.marked.Renderer === 'function') {
                    renderer = new global.marked.Renderer();
                    var defaultImage = renderer.image;

                    renderer.image = function (href, title, text) {
                        // Use ALT text first (easy to set while writing), fallback to title.
                        var layout = parseImageLayout(text) || parseImageLayout(title);
                        var imageTitle = layout ? null : title; // preserve original tooltip only when no layout keywords were found

                        var imgHtml = defaultImage.call(this, href, imageTitle, text);

                        var classes = ['blog-img'];
                        var style = '';
                        if (layout) {
                            classes.push('img-block', 'align-' + layout.align);
                            style = ' style="width: ' + layout.pct + '%; max-width: 100%;"';
                        }

                        // Insert class/style right after `<img`.
                        var dataLayout = layout ? (layout.pct + '-' + layout.align) : 'none';
                        var dataAttrs =
                            ' data-blog-img-layout="' +
                            dataLayout +
                            '"' +
                            ' data-blog-img-title="' +
                            String(title).replace(/"/g, '&quot;') +
                            '"';

                        return imgHtml.replace('<img', '<img class="' + classes.join(' ') + '"' + style + dataAttrs);
                    };
                }

                if (global.marked && typeof global.marked.parse === 'function') {
                    if (renderer) {
                        html = global.marked.parse(parsed.content, { renderer: renderer });
                    } else {
                        html = global.marked.parse(parsed.content);
                    }
                } else if (global.marked && typeof global.marked === 'function') {
                    html = global.marked(parsed.content);
                } else {
                    // Fallback: preformatted text if marked is not available.
                    html = '<pre>' + parsed.content.replace(/</g, '&lt;') + '</pre>';
                }

                target.innerHTML = html;
                applyBlogImageLayout(target);

                if (typeof callback === 'function') {
                    callback(parsed.frontMatter, target);
                }
            })
            .catch(function (err) {
                var errorMsg = 'Error loading article: ' + markdownPath;
                target.innerHTML =
                    '<div class="alert alert-danger">' + errorMsg + '</div>';
                // eslint-disable-next-line no-console
                console.error('MarkdownRenderer error:', err);
                // eslint-disable-next-line no-console
                console.error('Attempted path:', markdownPath);
            });
    }

    global.MarkdownRenderer = {
        renderFromPath: renderMarkdownFromPath
    };
})(window);

