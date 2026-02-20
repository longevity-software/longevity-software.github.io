/* Simple markdown rendering helper using marked.js */

(function (global) {
    'use strict';

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

                if (global.marked && typeof global.marked.parse === 'function') {
                    html = global.marked.parse(parsed.content);
                } else if (global.marked && typeof global.marked === 'function') {
                    html = global.marked(parsed.content);
                } else {
                    // Fallback: preformatted text if marked is not available.
                    html = '<pre>' + parsed.content.replace(/</g, '&lt;') + '</pre>';
                }

                target.innerHTML = html;

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

