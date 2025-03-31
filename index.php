<?php
$themes = [
    'cyberpunk' => [
        'name' => 'Cyberpunk 2077',
        'codemirror' => 'nord',
        'navbar' => 'dark',
        'bg' => '#0c0e1a',
        'primary' => '#ff2a6d',
        'secondary' => '#05d9e8',
        'text' => '#d1f7ff',
        'editor_bg' => '#12172d',
        'output_bg' => '#12172d',
        'terminal_bg' => '#0c0e1a',
        'terminal_text' => '#d1f7ff',
        'border_color' => '#05d9e8',
        'error_color' => '#ff2a6d',
        'warning_color' => '#ffcc00',
        'success_color' => '#00ff9f',
        'accent_color' => '#bd00ff',
        'highlight_color' => '#05d9e8',
        'background_pattern' => 'linear-gradient(135deg, rgba(5, 217, 232, 0.05) 0%, rgba(189, 0, 255, 0.05) 100%)',
        'terminal_pattern' => 'radial-gradient(circle at 10% 20%, rgba(255, 42, 109, 0.03) 0%, rgba(5, 217, 232, 0.03) 90%)'
    ],
    'neon-dream' => [
        'name' => 'Neon Dream',
        'codemirror' => 'dracula',
        'navbar' => 'dark',
        'bg' => '#0a0a1a',
        'primary' => '#ff00aa',
        'secondary' => '#00ffcc',
        'text' => '#e0e0ff',
        'editor_bg' => '#0f0f2d',
        'output_bg' => '#0f0f2d',
        'terminal_bg' => '#0a0a1a',
        'terminal_text' => '#e0e0ff',
        'border_color' => '#00ffcc',
        'error_color' => '#ff0066',
        'warning_color' => '#ffcc00',
        'success_color' => '#00ff88',
        'accent_color' => '#aa00ff',
        'highlight_color' => '#00ffff',
        'background_pattern' => 'linear-gradient(135deg, rgba(170, 0, 255, 0.05) 0%, rgba(0, 255, 204, 0.05) 100%)',
        'terminal_pattern' => 'linear-gradient(135deg, rgba(255, 0, 170, 0.03) 0%, rgba(0, 255, 204, 0.03) 100%)'
    ],
    'matrix-reloaded' => [
        'name' => 'Matrix Reloaded',
        'codemirror' => 'blackboard',
        'navbar' => 'dark',
        'bg' => '#000000',
        'primary' => '#00ff41',
        'secondary' => '#008f11',
        'text' => '#ffffff',
        'editor_bg' => '#0a0a0a',
        'output_bg' => '#0a0a0a',
        'terminal_bg' => '#000000',
        'terminal_text' => '#00ff41',
        'border_color' => '#00ff41',
        'error_color' => '#ff5555',
        'warning_color' => '#ffb86c',
        'success_color' => '#50fa7b',
        'accent_color' => '#00d3ff',
        'highlight_color' => '#00ff41',
        'background_pattern' => 'linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px)',
        'terminal_pattern' => 'radial-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px)'
    ],
    'solar-flare' => [
        'name' => 'Solar Flare',
        'codemirror' => 'solarized',
        'navbar' => 'light',
        'bg' => '#fdf6e3',
        'primary' => '#268bd2',
        'secondary' => '#2aa198',
        'text' => '#586e75',
        'editor_bg' => '#fdf6e3',
        'output_bg' => '#eee8d5',
        'terminal_bg' => '#eee8d5',
        'terminal_text' => '#586e75',
        'border_color' => '#268bd2',
        'error_color' => '#dc322f',
        'warning_color' => '#b58900',
        'success_color' => '#859900',
        'accent_color' => '#6c71c4',
        'highlight_color' => '#2aa198',
        'background_pattern' => 'linear-gradient(135deg, rgba(38, 139, 210, 0.05) 0%, rgba(42, 161, 152, 0.05) 100%)',
        'terminal_pattern' => 'linear-gradient(135deg, rgba(203, 75, 22, 0.03) 0%, rgba(42, 161, 152, 0.03) 100%)'
    ],
    'deep-space' => [
        'name' => 'Deep Space',
        'codemirror' => 'material',
        'navbar' => 'dark',
        'bg' => '#0a0e14',
        'primary' => '#ff7b72',
        'secondary' => '#79c0ff',
        'text' => '#c9d1d9',
        'editor_bg' => '#0a0e14',
        'output_bg' => '#161b22',
        'terminal_bg' => '#161b22',
        'terminal_text' => '#c9d1d9',
        'border_color' => '#79c0ff',
        'error_color' => '#ff7b72',
        'warning_color' => '#ffa657',
        'success_color' => '#7ee787',
        'accent_color' => '#d2a8ff',
        'highlight_color' => '#79c0ff',
        'background_pattern' => 'linear-gradient(135deg, rgba(121, 192, 255, 0.05) 0%, rgba(255, 123, 114, 0.05) 100%)',
        'terminal_pattern' => 'radial-gradient(circle at 70% 30%, rgba(121, 192, 255, 0.03) 0%, rgba(255, 123, 114, 0.03) 100%)'
    ]
];

// Get selected theme from cookie or use default theme
$current_theme = $_COOKIE['selected_theme'] ?? 'solar-flare';
$theme = $themes[$current_theme] ?? $themes['solar-flare'];
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional Page Builder</title>
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="Css/style.css">
    <style>
        body {
            background-color: <?php echo $theme['bg'];
                                ?>;
            color: <?php echo $theme['text'];
                    ?>;
            background-image: <?php echo $theme['background_pattern'];
                                ?>;
        }

        .btn-primary {
            background-color: <?php echo $theme['primary'];
                                ?>;
            border-color: <?php echo $theme['primary'];
                            ?>;
        }
    </style>
</head>

<body>
    <div class="theme-selector-container">
        <div class="theme-selector">
            <span class="theme-label"><i class="fas fa-palette"></i> Select Theme:</span>
            <select id="themeSelector" class="theme-dropdown">
                <?php foreach ($themes as $key => $theme_option): ?>
                    <option value="<?= $key ?>" <?= $key === $current_theme ? 'selected' : '' ?>>
                        <?= $theme_option['name'] ?>
                    </option>
                <?php endforeach; ?>
            </select>
            <div class="theme-preview">
                <?php foreach ($themes as $key => $theme_option): ?>
                    <div class="theme-option <?= $key === $current_theme ? 'active' : '' ?>"
                        data-theme="<?= $key ?>"
                        style="--primary: <?= $theme_option['primary'] ?>; --secondary: <?= $theme_option['secondary'] ?>;">
                        <span class="theme-dot primary"></span>
                        <span class="theme-dot secondary"></span>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="header">
            <h1><i class="fas fa-magic"></i> Professional Page Builder</h1>
            <p>All the tools you need to build advanced web pages</p>
        </div>

        <div class="editor-container">
            <div class="toolbar">
                <div class="media-insert">
                    <button id="insertImage" class="media-btn">
                        <i class="fas fa-image"></i> Image
                    </button>
                    <button id="insertVideo" class="media-btn">
                        <i class="fas fa-video"></i> Video
                    </button>
                    <button id="insertAudio" class="media-btn">
                        <i class="fas fa-music"></i> Audio
                    </button>
                    <button id="insertDivider" class="media-btn">
                        <i class="fas fa-minus"></i> Line
                    </button>
                    <button id="insertSection" class="media-btn">
                        <i class="fas fa-square"></i> Section
                    </button>
                    <button id="insertGrid" class="media-btn">
                        <i class="fas fa-th"></i> Grid
                    </button>
                    <button id="insertHeader" class="media-btn">
                        <i class="fas fa-heading"></i> Header
                    </button>
                    <button id="insertFooter" class="media-btn">
                        <i class="fas fa-footer"></i> Footer
                    </button>
                    <button id="insertLink" class="media-btn">
                        <i class="fas fa-link"></i> Link
                    </button>
                    <button id="insertCode" class="media-btn">
                        <i class="fas fa-code"></i> Code
                    </button>
                </div>
                <button id="downloadBtn" class="btn btn-success">
                    <i class="fas fa-download"></i> Download Page
                </button>
            </div>
            <div id="editor">
                <div class="header-section">
                    <div class="layout-controls">
                        <button class="drag-handle" title="Move"><i class="fas fa-arrows-alt"></i></button>
                        <button class="edit-layout" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="delete-layout" title="Delete"><i class="fas fa-trash"></i></button>
                    </div>
                    <h1>Your Page Title</h1>
                    <p>Header description</p>
                </div>

                <div class="section">
                    <div class="section-controls">
                        <button class="drag-handle" title="Move"><i class="fas fa-arrows-alt"></i></button>
                        <button class="edit-section" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="delete-section" title="Delete"><i class="fas fa-trash"></i></button>
                    </div>
                    <h2>Main Section</h2>
                    <p>Write your content here...</p>
                </div>

                <div class="footer-section">
                    <div class="layout-controls">
                        <button class="drag-handle" title="Move"><i class="fas fa-arrows-alt"></i></button>
                        <button class="edit-layout" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="delete-layout" title="Delete"><i class="fas fa-trash"></i></button>
                    </div>
                    <p>All rights reserved © <span class="current-year">2023</span></p>
                </div>
            </div>
        </div>

        <div class="preview">
            <div class="tab-container">
                <div class="tab active" data-tab="preview">Preview</div>
                <div class="tab" data-tab="html">HTML Code</div>
                <div class="tab" data-tab="live">Live Preview</div>
            </div>

            <div class="tab-content active" id="previewContent">
                <h2><i class="fas fa-eye"></i> Content Preview</h2>
                <div id="preview"></div>
            </div>

            <div class="tab-content" id="htmlContent">
                <h2><i class="fas fa-code"></i> Generated HTML Code</h2>
                <pre id="htmlCodePreview"
                    style="background: #f5f5f5; padding: 15px; border-radius: 4px; overflow-x: auto;"></pre>
                <button id="copyHtmlBtn" class="btn btn-secondary">
                    <i class="fas fa-copy"></i> Copy Code
                </button>
            </div>

            <div class="tab-content" id="livePreviewContent">
                <h2><i class="fas fa-desktop"></i> Live Preview</h2>
                <div class="live-preview-container">
                    <div class="live-preview-header">
                        <span>Page Preview</span>
                        <button id="refreshPreview" class="btn btn-sm">
                            <i class="fas fa-sync-alt"></i> Refresh
                        </button>
                    </div>
                    <div class="live-preview-content">
                        <iframe id="livePreviewFrame" style="width: 100%; height: 400px; border: none;"></iframe>
                    </div>
                </div>
            </div>
        </div>

        <input type="file" id="imageUpload" accept="image/*" class="hidden">
        <input type="file" id="videoUpload" accept="video/*" class="hidden">
        <input type="file" id="audioUpload" accept="audio/*" class="hidden">
    </div>

    <div class="overlay" id="overlay"></div>

    <!-- Media Settings Panel -->
    <div class="settings-panel" id="settingsPanel">
        <h3><i class="fas fa-cog"></i> Display Settings</h3>
        <div id="settingsContent">
            <div class="form-group">
                <label for="mediaWidth">Width</label>
                <input type="text" id="mediaWidth" class="form-control" placeholder="Example: 100% or 500px">
            </div>
            <div class="form-group">
                <label for="mediaAlign">Alignment</label>
                <select id="mediaAlign" class="form-control">
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                </select>
            </div>
            <div class="form-group">
                <label for="mediaMargin">Margin</label>
                <input type="text" id="mediaMargin" class="form-control" placeholder="Example: 10px or 10px 20px">
            </div>
            <div class="form-group">
                <label for="mediaBorder">Border</label>
                <input type="text" id="mediaBorder" class="form-control" placeholder="Example: 1px solid #000">
            </div>
            <div class="form-group">
                <label for="mediaBorderRadius">Border Radius</label>
                <input type="text" id="mediaBorderRadius" class="form-control" placeholder="Example: 5px">
            </div>
        </div>
        <div class="btn-group">
            <button id="cancelSettings" class="btn btn-secondary">Cancel</button>
            <button id="saveSettings" class="btn">Save</button>
        </div>
    </div>

    <!-- HTML Code Insert Panel -->
    <div class="settings-panel" id="codePanel">
        <h3><i class="fas fa-code"></i> Insert HTML Code</h3>
        <div id="codeContent">
            <div class="form-group">
                <label for="htmlCode">Enter your HTML code:</label>
                <textarea id="htmlCode" class="form-control" rows="8"
                    style="direction: ltr; text-align: left; font-family: 'Courier New', monospace;"
                    placeholder='Example: <div class="my-class">Content</div>'></textarea>
            </div>
            <div class="form-group code-language-selector">
                <label for="codeLanguage">Code Language:</label>
                <select id="codeLanguage" class="form-control">
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                    <option value="php">PHP</option>
                    <option value="python">Python</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
        <div class="btn-group">
            <button id="cancelCode" class="btn btn-secondary">Cancel</button>
            <button id="insertCodeBtn" class="btn">Insert Code</button>
        </div>
    </div>

    <!-- Link Insert Panel -->
    <div class="settings-panel" id="linkPanel">
        <h3><i class="fas fa-link"></i> Insert Link</h3>
        <div id="linkContent">
            <div class="form-group">
                <label for="linkUrl">URL Address:</label>
                <input type="text" id="linkUrl" class="form-control" placeholder="https://example.com">
            </div>
            <div class="form-group">
                <label for="linkText">Display Text (Optional):</label>
                <input type="text" id="linkText" class="form-control" placeholder="Example: Click here">
            </div>
            <div class="form-group">
                <label for="linkTarget">Open In:</label>
                <select id="linkTarget" class="form-control">
                    <option value="_self">Same Window</option>
                    <option value="_blank">New Window</option>
                </select>
            </div>
        </div>
        <div class="btn-group">
            <button id="cancelLink" class="btn btn-secondary">Cancel</button>
            <button id="insertLinkBtn" class="btn">Insert Link</button>
        </div>
    </div>

    <!-- Grid Settings Panel -->
    <div class="settings-panel" id="gridPanel">
        <h3><i class="fas fa-th"></i> Grid Settings</h3>
        <div id="gridContent">
            <div class="form-group">
                <label for="gridColumns">Number of Columns:</label>
                <select id="gridColumns" class="form-control">
                    <option value="1">1 Column</option>
                    <option value="2">2 Columns</option>
                    <option value="3" selected>3 Columns</option>
                    <option value="4">4 Columns</option>
                    <option value="5">5 Columns</option>
                </select>
            </div>
            <div class="form-group">
                <label for="gridLayout">Layout:</label>
                <select id="gridLayout" class="form-control">
                    <option value="equal">Equal Columns</option>
                    <option value="custom">Custom</option>
                </select>
            </div>
            <div class="form-group" id="customGridLayoutGroup" style="display: none;">
                <label>Column Widths (in percentage):</label>
                <div id="gridColumnWidths"></div>
            </div>
            <div class="form-group">
                <label for="gridGap">Column Gap:</label>
                <input type="text" id="gridGap" class="form-control" value="15px" placeholder="Example: 15px">
            </div>
        </div>
        <div class="btn-group">
            <button id="cancelGrid" class="btn btn-secondary">Cancel</button>
            <button id="insertGridBtn" class="btn">Create Grid</button>
        </div>
    </div>

    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.14.0/Sortable.min.js"></script>
    <script>
        document.getElementById('themeSelector').addEventListener('change', function() {
            const selectedTheme = this.value;

            // Save selected theme in cookie
            document.cookie = `selected_theme=${selectedTheme}; path=/; max-age=${60*60*24*30}`;

            // Apply changes without page reload
            applyTheme(selectedTheme);
        });

        // Click on theme previews
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                document.getElementById('themeSelector').value = theme;
                document.cookie = `selected_theme=${theme}; path=/; max-age=${60*60*24*30}`;
                applyTheme(theme);

                // Update active status
                document.querySelectorAll('.theme-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                this.classList.add('active');
            });
        });

        function applyTheme(themeName) {
            fetch('get_theme.php?theme=' + themeName)
                .then(response => response.json())
                .then(theme => {
                    // Apply new CSS variables
                    const root = document.documentElement;
                    root.style.setProperty('--theme-name', `'${theme.name}'`);
                    root.style.setProperty('--bg-color', theme.bg);
                    root.style.setProperty('--primary-color', theme.primary);
                    root.style.setProperty('--primary-hover', theme.primary + 'cc');
                    root.style.setProperty('--secondary-color', theme.secondary);
                    root.style.setProperty('--text-color', theme.text);
                    root.style.setProperty('--editor-bg', theme.editor_bg);
                    root.style.setProperty('--border-color', theme.border_color);
                    root.style.setProperty('--background-pattern', theme.background_pattern);

                    // Change CodeMirror theme (if used)
                    if (typeof editor !== 'undefined') {
                        editor.setOption('theme', theme.codemirror);
                    }

                    // Show notification
                    showThemeNotification(theme.name);
                });
        }

        function showThemeNotification(themeName) {
            const notification = document.createElement('div');
            notification.className = 'theme-notification';
            notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Theme ${themeName} applied successfully
    `;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.classList.add('show');
            }, 10);

            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }
    </script>
    <script src="Js/app.js"></script>
</body>

</html>