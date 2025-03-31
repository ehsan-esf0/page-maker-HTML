const BlockEmbed = Quill.import('blots/block/embed');
const Inline = Quill.import('blots/inline');

class HeaderBlot extends BlockEmbed {
    static create(value) {
        const node = super.create();
        node.setAttribute('class', 'header-section');
        node.innerHTML = value || '';
        const controls = document.createElement('div');
        controls.setAttribute('class', 'layout-controls');
        controls.innerHTML = `
                    <button class="drag-handle" title="Move"><i class="fas fa-arrows-alt"></i></button>
                    <button class="edit-layout" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="delete-layout" title="Delete"><i class="fas fa-trash"></i></button>
                `;
        node.appendChild(controls);

        return node;
    }

    static value(node) {
        return node.innerHTML;
    }
}
HeaderBlot.blotName = 'headerSection';
HeaderBlot.tagName = 'div';
Quill.register(HeaderBlot);


class FooterBlot extends BlockEmbed {
    static create(value) {
        const node = super.create();
        node.setAttribute('class', 'footer-section');
        node.innerHTML = value || '';

        const controls = document.createElement('div');
        controls.setAttribute('class', 'layout-controls');
        controls.innerHTML = `
                    <button class="drag-handle" title="Move"><i class="fas fa-arrows-alt"></i></button>
                    <button class="edit-layout" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="delete-layout" title="Delete"><i class="fas fa-trash"></i></button>
                `;
        node.appendChild(controls);

        return node;
    }

    static value(node) {
        return node.innerHTML;
    }
}
FooterBlot.blotName = 'footerSection';
FooterBlot.tagName = 'div';
Quill.register(FooterBlot);


class GridBlot extends BlockEmbed {
    static create(value) {
        const node = super.create();
        node.setAttribute('class', 'grid-container');

        const columns = value.columns || 3;
        const gap = value.gap || '15px';
        const layout = value.layout || 'equal';
        const columnWidths = value.columnWidths || [];

        node.style.gridTemplateColumns = layout === 'equal' ?
            `repeat(${columns}, 1fr)` :
            columnWidths.map(width => `${width}%`).join(' ');
        node.style.gap = gap;

        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.setAttribute('class', 'grid-column');
            column.innerHTML = value.content && value.content[i] ? value.content[i] : `<p>Column ${i + 1}</p>`;

            const controls = document.createElement('div');
            controls.setAttribute('class', 'grid-controls');
            controls.innerHTML = `
                        <button class="drag-handle" title="Move"><i class="fas fa-arrows-alt"></i></button>
                        <button class="edit-grid-column" title="Edit"><i class="fas fa-edit"></i></button>
                    `;
            column.appendChild(controls);

            node.appendChild(column);
        }

        return node;
    }

    static value(node) {
        const columns = node.children.length;
        const gap = node.style.gap;
        const gridTemplateColumns = node.style.gridTemplateColumns;

        const isEqual = gridTemplateColumns.includes('1fr');
        const layout = isEqual ? 'equal' : 'custom';

        const columnWidths = isEqual ? [] :
            gridTemplateColumns.split(' ').map(col => parseFloat(col));

        const content = [];
        for (let i = 0; i < node.children.length; i++) {
            content.push(node.children[i].innerHTML);
        }

        return {
            columns,
            gap,
            layout,
            columnWidths,
            content
        };
    }
}
GridBlot.blotName = 'gridLayout';
GridBlot.tagName = 'div';
Quill.register(GridBlot);

class SectionBlot extends BlockEmbed {
    static create(value) {
        const node = super.create();
        node.setAttribute('class', 'section');
        node.innerHTML = value || '';

        const controls = document.createElement('div');
        controls.setAttribute('class', 'section-controls');
        controls.innerHTML = `
                    <button class="drag-handle" title="Move"><i class="fas fa-arrows-alt"></i></button>
                    <button class="edit-section" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="delete-section" title="Delete"><i class="fas fa-trash"></i></button>
                `;
        node.appendChild(controls);

        return node;
    }

    static value(node) {
        return node.innerHTML;
    }
}
SectionBlot.blotName = 'section';
SectionBlot.tagName = 'div';
Quill.register(SectionBlot);

class CodeBlockBlot extends BlockEmbed {
    static create(value) {
        const node = super.create();
        node.setAttribute('class', 'code-block');
        node.innerHTML = value.code || '';
        node.setAttribute('data-language', value.language || 'html');

        const languageLabel = document.createElement('span');
        languageLabel.className = 'code-language';
        languageLabel.textContent = value.language || 'html';
        node.appendChild(languageLabel);


        const controls = document.createElement('div');
        controls.className = 'code-controls';
        controls.innerHTML = `
                    <button class="drag-handle" title="Move"><i class="fas fa-arrows-alt"></i></button>
                    <button class="edit-code" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="delete-code" title="Delete"><i class="fas fa-trash"></i></button>
                `;
        node.appendChild(controls);

        return node;
    }

    static value(node) {
        return {
            code: node.innerHTML,
            language: node.getAttribute('data-language') || 'html'
        };
    }
}
CodeBlockBlot.blotName = 'codeBlock';
CodeBlockBlot.tagName = 'pre';
Quill.register(CodeBlockBlot);

class MediaWrapper extends BlockEmbed {
    static create(value) {
        const node = super.create();
        node.setAttribute('class', 'ql-media-wrapper');
        node.setAttribute('data-type', value.type);
        node.setAttribute('data-settings', JSON.stringify(value.settings || {}));

        let mediaElement;
        if (value.type === 'image') {
            mediaElement = document.createElement('img');
            mediaElement.setAttribute('src', value.url);
            mediaElement.style.maxWidth = '100%';
        } else if (value.type === 'video') {
            mediaElement = document.createElement('video');
            mediaElement.setAttribute('src', value.url);
            mediaElement.setAttribute('controls', '');
            mediaElement.style.maxWidth = '100%';
        } else if (value.type === 'audio') {
            mediaElement = document.createElement('audio');
            mediaElement.setAttribute('src', value.url);
            mediaElement.setAttribute('controls', '');
            mediaElement.style.width = '100%';
        }

        if (mediaElement) {
            this.applySettings(mediaElement, value.settings || {});
            node.appendChild(mediaElement);
        }

        const controls = document.createElement('div');
        controls.setAttribute('class', 'media-controls');
        controls.innerHTML = `
                    <button class="drag-handle" title="Move"><i class="fas fa-arrows-alt"></i></button>
                    <button class="edit-media" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="delete-media" title="Delete"><i class="fas fa-trash"></i></button>
                `;
        node.appendChild(controls);

        return node;
    }

    static value(node) {
        const mediaElement = node.querySelector('img, video, audio');
        return {
            type: node.getAttribute('data-type'),
            url: mediaElement ? mediaElement.src : '',
            settings: JSON.parse(node.getAttribute('data-settings') || '{}')
        };
    }

    static applySettings(element, settings) {
        if (!element) return;

        element.style.width = settings.width || '';
        element.style.margin = settings.margin || '15px auto';
        element.style.border = settings.border || 'none';
        element.style.borderRadius = settings.borderRadius || '4px';

        if (settings.align === 'right') {
            element.style.display = 'inline-block';
            element.style.float = 'right';
            element.style.margin = '15px 0 15px 15px';
        } else if (settings.align === 'left') {
            element.style.display = 'inline-block';
            element.style.float = 'left';
            element.style.margin = '15px 15px 15px 0';
        } else {
            element.style.display = 'block';
            element.style.marginLeft = 'auto';
            element.style.marginRight = 'auto';
            element.style.float = 'none';
        }
    }
}
MediaWrapper.blotName = 'mediaWrapper';
MediaWrapper.tagName = 'div';
Quill.register(MediaWrapper);

class DividerBlot extends BlockEmbed {
    static create() {
        const node = super.create();
        node.innerHTML = null;
        return node;
    }
}
DividerBlot.blotName = 'divider';
DividerBlot.tagName = 'div';
Quill.register(DividerBlot);

const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{
                'header': [1, 2, 3, false]
            }],
            ['bold', 'italic', 'underline', 'strike'],
            [{
                'color': []
            }, {
                'background': []
            }],
            [{
                'list': 'ordered'
            }, {
                'list': 'bullet'
            }],
            ['link', 'blockquote', 'code-block'],
            [{
                'align': []
            }, {
                'direction': 'rtl'
            }],
            ['clean']
        ]
    },
    placeholder: 'Write your content here...'
});

const editorElement = document.querySelector('.ql-editor');
editorElement.style.textAlign = 'right';
editorElement.style.direction = 'rtl';

let currentMediaElement = null;
let currentCodeElement = null;
let currentSettings = {
    width: '',
    align: 'center',
    margin: '15px auto',
    border: 'none',
    borderRadius: '4px'
};

function getNodeIndex(node) {
    return Array.from(node.parentNode.childNodes).indexOf(node);
}

function updatePreview() {
    const editorContent = document.querySelector('.ql-editor').cloneNode(true);

    editorContent.querySelectorAll('.media-controls, .section-controls, .layout-controls, .grid-controls, .code-controls').forEach(control => {
        control.remove();
    });

    document.getElementById('preview').innerHTML = editorContent.innerHTML;

    const htmlContent = generateHtmlForDownload();
    document.getElementById('htmlCodePreview').textContent = htmlContent;

    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}

function updateLivePreview() {
    const htmlContent = generateHtmlForDownload();
    const previewFrame = document.getElementById('livePreviewFrame');
    const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;

    previewDoc.open();
    previewDoc.write(htmlContent);
    previewDoc.close();
}

function showPanel(panelId) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById(panelId).style.display = 'block';
}

function hidePanels() {
    document.getElementById('overlay').style.display = 'none';
    document.querySelectorAll('.settings-panel').forEach(panel => {
        panel.style.display = 'none';
    });
}

function generateHtmlForDownload() {
    const editorContent = document.querySelector('.ql-editor').cloneNode(true);

    editorContent.querySelectorAll('.media-controls, .section-controls, .layout-controls, .grid-controls, .code-controls').forEach(control => {
        control.remove();
    });

    editorContent.querySelectorAll('.ql-media-wrapper').forEach(wrapper => {
        const settings = JSON.parse(wrapper.getAttribute('data-settings') || '{}');
        const mediaElement = wrapper.querySelector('img, video, audio');
        MediaWrapper.applySettings(mediaElement, settings);

        if (mediaElement) {
            wrapper.parentNode.insertBefore(mediaElement, wrapper);
            wrapper.remove();
        }
    });

    editorContent.querySelectorAll('.section, .header-section, .footer-section').forEach(section => {
        const content = section.querySelector('div:not(.section-controls):not(.layout-controls)');
        if (content) {
            section.innerHTML = content.innerHTML;
        }
    });

    editorContent.querySelectorAll('.grid-container').forEach(grid => {
        const columns = Array.from(grid.children);
        columns.forEach(column => {
            const content = column.querySelector('div:not(.grid-controls)');
            if (content) {
                column.innerHTML = content.innerHTML;
            }
        });
    });

    editorContent.querySelectorAll('.code-block').forEach(codeBlock => {
        const code = codeBlock.innerHTML;
        const language = codeBlock.getAttribute('data-language') || 'html';

        const languageLabel = codeBlock.querySelector('.code-language');
        if (languageLabel) {
            languageLabel.remove();
        }
        codeBlock.innerHTML = `<code>${code}</code>`;
    });

    const content = editorContent.innerHTML;

    return `<!DOCTYPE html>
<html lang="en" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
        }
        .content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .header-section {
            background-color: #4a6fa5;
            color: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
        }
        .footer-section {
            background-color: #333;
            color: white;
            padding: 20px;
            margin-top: 20px;
            border-radius: 8px;
        }
        img, video {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 15px auto;
            border-radius: 4px;
        }
        audio {
            width: 100%;
            margin: 15px auto;
        }
        hr {
            border-top: 2px solid #4a6fa5;
            margin: 20px 0;
        }
        .code-block {
            background: #f5f5f5;
            border-radius: 4px;
            padding: 15px;
            font-family: 'Courier New', monospace;
            direction: ltr;
            text-align: left;
            margin: 15px 0;
            overflow-x: auto;
        }
        .code-block code {
            display: block;
            white-space: pre;
        }
        .section {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 8px;
        }
        .grid-container {
            display: grid;
            gap: 15px;
            margin: 20px 0;
        }
        .grid-column {
            border: 1px solid #eee;
            padding: 15px;
            border-radius: 4px;
            background-color: #f9f9f9;
        }
        a {
            color: #4a6fa5;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="content">
        ${content}
    </div>
</body>
</html>`;
}

function setupGridPanel() {
    const gridColumnsSelect = document.getElementById('gridColumns');
    const gridLayoutSelect = document.getElementById('gridLayout');
    const customGridLayoutGroup = document.getElementById('customGridLayoutGroup');
    const gridColumnWidths = document.getElementById('gridColumnWidths');

    gridLayoutSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customGridLayoutGroup.style.display = 'block';
            updateColumnWidthInputs(gridColumnsSelect.value);
        } else {
            customGridLayoutGroup.style.display = 'none';
        }
    });

    gridColumnsSelect.addEventListener('change', function() {
        if (gridLayoutSelect.value === 'custom') {
            updateColumnWidthInputs(this.value);
        }
    });

    function updateColumnWidthInputs(columns) {
        gridColumnWidths.innerHTML = '';
        for (let i = 0; i < columns; i++) {
            const group = document.createElement('div');
            group.className = 'form-group';

            const label = document.createElement('label');
            label.textContent = `Column ${i + 1} Width:`;

            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'form-control';
            input.placeholder = 'Percentage';
            input.value = Math.floor(100 / columns);
            input.min = 1;
            input.max = 100;

            group.appendChild(label);
            group.appendChild(input);
            gridColumnWidths.appendChild(group);
        }
    }
}

function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(`${tabId}Content`).classList.add('active');

            if (tabId === 'live') {
                updateLivePreview();
            }
        });
    });
}

quill.on('text-change', updatePreview);

editorElement.addEventListener('click', function(e) {
    if (e.target.closest('.delete-media')) {
        const mediaWrapper = e.target.closest('.ql-media-wrapper');
        if (mediaWrapper) {
            const index = getNodeIndex(mediaWrapper);
            quill.deleteText(index, 1);
        }
    }
    if (e.target.closest('.edit-media')) {
        const mediaWrapper = e.target.closest('.ql-media-wrapper');
        if (mediaWrapper) {
            currentMediaElement = mediaWrapper;
            const settings = JSON.parse(mediaWrapper.getAttribute('data-settings') || '{}');
            document.getElementById('mediaWidth').value = settings.width || '';
            document.getElementById('mediaAlign').value = settings.align || 'center';
            document.getElementById('mediaMargin').value = settings.margin || '15px auto';
            document.getElementById('mediaBorder').value = settings.border || 'none';
            document.getElementById('mediaBorderRadius').value = settings.borderRadius || '4px';

            showPanel('settingsPanel');
        }
    }
    if (e.target.closest('.delete-section')) {
        const section = e.target.closest('.section');
        if (section) {
            const index = getNodeIndex(section);
            quill.deleteText(index, 1);
        }
    }
    if (e.target.closest('.delete-layout')) {
        const layout = e.target.closest('.header-section, .footer-section');
        if (layout) {
            const index = getNodeIndex(layout);
            quill.deleteText(index, 1);
        }
    }
    if (e.target.closest('.delete-code')) {
        const codeBlock = e.target.closest('.code-block');
        if (codeBlock) {
            const index = getNodeIndex(codeBlock);
            quill.deleteText(index, 1);
        }
    }
    if (e.target.closest('.edit-code')) {
        const codeBlock = e.target.closest('.code-block');
        if (codeBlock) {
            currentCodeElement = codeBlock;
            const code = codeBlock.textContent;
            const language = codeBlock.getAttribute('data-language') || 'html';

            document.getElementById('htmlCode').value = code;
            document.getElementById('codeLanguage').value = language;

            showPanel('codePanel');
        }
    }
});

document.getElementById('imageUpload').addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'mediaWrapper', {
                type: 'image',
                url: e.target.result,
                settings: {
                    width: '100%',
                    align: 'center',
                    margin: '15px auto',
                    border: 'none',
                    borderRadius: '4px'
                }
            });
            quill.setSelection(range.index + 1);
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById('videoUpload').addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'mediaWrapper', {
                type: 'video',
                url: e.target.result,
                settings: {
                    width: '100%',
                    align: 'center',
                    margin: '15px auto',
                    border: 'none',
                    borderRadius: '4px'
                }
            });
            quill.setSelection(range.index + 1);
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById('audioUpload').addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'mediaWrapper', {
                type: 'audio',
                url: e.target.result,
                settings: {
                    width: '100%',
                    align: 'center',
                    margin: '15px auto',
                    border: 'none',
                    borderRadius: '4px'
                }
            });
            quill.setSelection(range.index + 1);
        };

        reader.readAsDataURL(file);
    }
});

// Button events
document.getElementById('insertImage').addEventListener('click', function() {
    document.getElementById('imageUpload').click();
});

document.getElementById('insertVideo').addEventListener('click', function() {
    document.getElementById('videoUpload').click();
});

document.getElementById('insertAudio').addEventListener('click', function() {
    document.getElementById('audioUpload').click();
});

document.getElementById('insertDivider').addEventListener('click', function() {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'divider', true);
    quill.setSelection(range.index + 1);
});

document.getElementById('insertSection').addEventListener('click', function() {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'section', '<h2>Section Title</h2><p>Section content...</p>');
    quill.setSelection(range.index + 1);
});

document.getElementById('insertHeader').addEventListener('click', function() {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'headerSection', '<h1>Page Header</h1><p>Header description</p>');
    quill.setSelection(range.index + 1);
});

document.getElementById('insertFooter').addEventListener('click', function() {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'footerSection', '<p>All rights reserved © ' + new Date().getFullYear() + '</p>');
    quill.setSelection(range.index + 1);
});

document.getElementById('insertLink').addEventListener('click', function() {
    document.getElementById('linkUrl').value = '';
    document.getElementById('linkText').value = '';
    document.getElementById('linkTarget').value = '_self';
    showPanel('linkPanel');
});

document.getElementById('insertCode').addEventListener('click', function() {
    document.getElementById('htmlCode').value = '';
    document.getElementById('codeLanguage').value = 'html';
    showPanel('codePanel');
});

document.getElementById('insertGrid').addEventListener('click', function() {
    showPanel('gridPanel');
});

document.getElementById('insertCodeBtn').addEventListener('click', function() {
    const code = document.getElementById('htmlCode').value.trim();
    const language = document.getElementById('codeLanguage').value;
    if (code) {
        const range = quill.getSelection();

        if (currentCodeElement) {
            const index = getNodeIndex(currentCodeElement);
            quill.deleteText(index, 1);
            quill.insertEmbed(index, 'codeBlock', {
                code: code,
                language: language
            });
            quill.setSelection(index + 1);
            currentCodeElement = null;
        } else {
            quill.insertEmbed(range.index, 'codeBlock', {
                code: code,
                language: language
            });
            quill.setSelection(range.index + 1);
        }
    }
    hidePanels();
});

document.getElementById('insertLinkBtn').addEventListener('click', function() {
    const url = document.getElementById('linkUrl').value.trim();
    const text = document.getElementById('linkText').value.trim();
    const target = document.getElementById('linkTarget').value;

    if (url) {
        const range = quill.getSelection();
        const linkText = text || url;

        if (range.length > 0) {
            quill.formatText(range.index, range.length, 'link', url);
        } else {
            quill.insertText(range.index, linkText, 'link', url);
            quill.setSelection(range.index + linkText.length);
        }
        const linkElement = document.querySelector(`a[href="${url}"]`);
        if (linkElement && target === '_blank') {
            linkElement.setAttribute('target', '_blank');
            linkElement.setAttribute('rel', 'noopener noreferrer');
        }
    }

    hidePanels();
});

document.getElementById('insertGridBtn').addEventListener('click', function() {
    const columns = parseInt(document.getElementById('gridColumns').value);
    const layout = document.getElementById('gridLayout').value;
    const gap = document.getElementById('gridGap').value || '15px';

    let columnWidths = [];
    if (layout === 'custom') {
        const inputs = document.querySelectorAll('#gridColumnWidths input');
        columnWidths = Array.from(inputs).map(input => parseFloat(input.value) || 0);
        const total = columnWidths.reduce((sum, width) => sum + width, 0);
        if (total !== 100) {
            columnWidths = columnWidths.map(width => Math.round((width / total) * 100));
        }
    }

    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'gridLayout', {
        columns: columns,
        gap: gap,
        layout: layout,
        columnWidths: columnWidths,
        content: Array(columns).fill('').map((_, i) => `<p>Column ${i + 1}</p>`)
    });
    quill.setSelection(range.index + 1);

    hidePanels();
});

document.getElementById('saveSettings').addEventListener('click', function() {
    const newSettings = {
        width: document.getElementById('mediaWidth').value,
        align: document.getElementById('mediaAlign').value,
        margin: document.getElementById('mediaMargin').value,
        border: document.getElementById('mediaBorder').value,
        borderRadius: document.getElementById('mediaBorderRadius').value
    };

    if (currentMediaElement) {
        currentMediaElement.setAttribute('data-settings', JSON.stringify(newSettings));
        const mediaElement = currentMediaElement.querySelector('img, video, audio');
        MediaWrapper.applySettings(mediaElement, newSettings);

        const index = getNodeIndex(currentMediaElement);
        const value = MediaWrapper.value(currentMediaElement);
        quill.deleteText(index, 1);
        quill.insertEmbed(index, 'mediaWrapper', value);
        quill.setSelection(index + 1);
    }

    hidePanels();
});

document.getElementById('cancelSettings').addEventListener('click', hidePanels);
document.getElementById('cancelCode').addEventListener('click', hidePanels);
document.getElementById('cancelLink').addEventListener('click', hidePanels);
document.getElementById('cancelGrid').addEventListener('click', hidePanels);
document.getElementById('overlay').addEventListener('click', hidePanels);

document.getElementById('copyHtmlBtn').addEventListener('click', function() {
    const htmlCode = document.getElementById('htmlCodePreview').textContent;
    navigator.clipboard.writeText(htmlCode).then(() => {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
});

document.getElementById('refreshPreview').addEventListener('click', updateLivePreview);
new Sortable(editorElement, {
    handle: '.drag-handle',
    animation: 150,
    onEnd: function() {
        const newHtml = editorElement.innerHTML;
        quill.clipboard.dangerouslyPasteHTML(0, newHtml);
    }
});
document.getElementById('downloadBtn').addEventListener('click', function() {
    const html = generateHtmlForDownload();

    const blob = new Blob([html], {
        type: 'text/html'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

setupGridPanel();
setupTabs();
updatePreview();
document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
});