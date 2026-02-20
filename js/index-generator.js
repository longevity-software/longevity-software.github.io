(function (global) {
    'use strict';

    function createPostLink(post) {
        var li = document.createElement('li');
        li.className = 'list-group-item';

        var a = document.createElement('a');
        a.href = 'post.html' + post.hash;
        a.textContent = post.title;
        a.className = 'full-width-link';

        li.appendChild(a);
        return li;
    }

    function createCategoryPanel(category) {
        var panel = document.createElement('div');
        panel.className = 'panel panel-default';

        var heading = document.createElement('div');
        heading.className = 'panel-heading';

        var h4 = document.createElement('h4');
        h4.className = 'panel-title';

        var a = document.createElement('a');
        a.setAttribute('data-toggle', 'collapse');
        a.href = '#' + category.panelId;
        a.textContent = category.label;
        a.className = 'full-width-link';

        h4.appendChild(a);
        heading.appendChild(h4);

        var collapse = document.createElement('div');
        collapse.id = category.panelId;
        collapse.className = 'panel-collapse collapse';

        var ul = document.createElement('ul');
        ul.className = 'list-group';

        (category.posts || []).forEach(function (post) {
            ul.appendChild(createPostLink(post));
        });

        collapse.appendChild(ul);

        panel.appendChild(heading);
        panel.appendChild(collapse);

        return panel;
    }

    function populateIndex(manifest) {
        var container = document.getElementById('blog-panels');
        if (!container) {
            return;
        }

        container.innerHTML = '';

        (manifest.categories || []).forEach(function (category) {
            container.appendChild(createCategoryPanel(category));
        });
    }

    function loadManifest() {
        fetch('markdown/manifest.json')
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Failed to load manifest.json');
                }
                return response.json();
            })
            .then(function (manifest) {
                populateIndex(manifest);
            })
            .catch(function (err) {
                var container = document.getElementById('blog-panels');
                if (container) {
                    container.innerHTML =
                        '<div class="alert alert-danger">Unable to load blog list.</div>';
                }
                // eslint-disable-next-line no-console
                console.error(err);
            });
    }

    function initIndex() {
        loadManifest();
    }

    global.IndexGenerator = {
        init: initIndex
    };
})(window);

