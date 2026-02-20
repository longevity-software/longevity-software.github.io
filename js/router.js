(function (global) {
    'use strict';

    function parseHash() {
        var hash = global.location.hash || '';
        if (hash.indexOf('#/') !== 0) {
            return null;
        }

        // Strip leading "#/" and split
        var parts = hash.substring(2).split('/');
        if (parts.length === 0) {
            return null;
        }

        return {
            segments: parts
        };
    }

    function routeToMarkdownPath(route) {
        if (!route || !route.segments || !route.segments.length) {
            return null;
        }

        // We expect something like Blogs/DesignPatterns/NullObject
        var relativePath = route.segments.join('/');
        return 'markdown/' + relativePath + '.md';
    }

    function updateDocumentTitle(frontMatter) {
        if (frontMatter && frontMatter.title) {
            document.title = frontMatter.title + ' - Longevity Software Blog';
        }
    }

    function loadCurrentRoute() {
        var route = parseHash();
        var markdownPath = routeToMarkdownPath(route);

        if (!markdownPath) {
            var container = document.getElementById('post-content');
            if (container) {
                container.innerHTML =
                    '<div class="alert alert-info">No article selected.</div>';
            }
            return;
        }

        if (!global.MarkdownRenderer) {
            // eslint-disable-next-line no-console
            console.error('MarkdownRenderer not available');
            return;
        }

        // eslint-disable-next-line no-console
        console.log('Loading markdown from path:', markdownPath);

        global.MarkdownRenderer.renderFromPath(
            markdownPath,
            'post-content',
            function (frontMatter) {
                updateDocumentTitle(frontMatter);
            }
        );
    }

    function initRouter() {
        global.addEventListener('hashchange', loadCurrentRoute);
        loadCurrentRoute();
    }

    global.PostRouter = {
        init: initRouter
    };
})(window);

