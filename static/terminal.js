(function (global, undefined) {

    var Terminal = Terminal || function(containerID, options) {
        if (!containerID) return;

        var defaults = {
            welcome: '',
            prompt: '<span class="user">guest</span>@<span class="hostname">waykodev</span>:',
            separator: '$',
            theme: 'interlaced'
        };

        var options = options || defaults;
        options.welcome = options.welcome || defaults.welcome;
        options.prompt = options.prompt || defaults.prompt;
        options.separator = options.separator || defaults.separator;
        options.theme = options.theme || defaults.theme;

        var extensions = Array.prototype.slice.call(arguments, 2);

        var _history = localStorage.history ? JSON.parse(localStorage.history) : [];
        var _histpos = _history.length;
        var _histtemp = '';

        // Create terminal and cache DOM nodes;
        var _terminal = document.getElementById(containerID);
        _terminal.classList.add('terminal');
        _terminal.classList.add('terminal-' + options.theme);
        _terminal.insertAdjacentHTML('beforeEnd', [
            '<div class="background"><div class="interlace"></div></div>',
            '<div class="header">',
            '<br>',
            '<div class="logotext">','&nbsp;█████&nbsp;&nbsp;&nbsp;███&nbsp;&nbsp;&nbsp;█████&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;█████<br>░░███&nbsp;&nbsp;&nbsp;░███&nbsp;&nbsp;░░███&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░███<br>&nbsp;░███&nbsp;&nbsp;&nbsp;░███&nbsp;&nbsp;&nbsp;░███&nbsp;&nbsp;&nbsp;██████&nbsp;&nbsp;&nbsp;█████&nbsp;████&nbsp;░███&nbsp;█████&nbsp;&nbsp;██████<br>&nbsp;░███&nbsp;&nbsp;&nbsp;░███&nbsp;&nbsp;&nbsp;░███&nbsp;&nbsp;░░░░░███&nbsp;░░███&nbsp;░███&nbsp;&nbsp;░███░░██&nbsp;&nbsp;&nbsp;███░░███<br>&nbsp;░░███&nbsp;&nbsp;█████&nbsp;&nbsp;███&nbsp;&nbsp;&nbsp;&nbsp;███████&nbsp;&nbsp;░███&nbsp;░███&nbsp;&nbsp;░██████░&nbsp;&nbsp;░███&nbsp;░███<br>&nbsp;&nbsp;░░░█████░█████░&nbsp;&nbsp;&nbsp;&nbsp;███░░███&nbsp;&nbsp;░███&nbsp;░███&nbsp;&nbsp;░███░░███&nbsp;░███&nbsp;░███<br>&nbsp;&nbsp;&nbsp;&nbsp;░░███&nbsp;░░███&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░████████&nbsp;░░███████&nbsp;&nbsp;████&nbsp;█████░░██████<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░&nbsp;&nbsp;&nbsp;░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░░&nbsp;&nbsp;&nbsp;░░░░░███&nbsp;░░░░&nbsp;░░░░░&nbsp;&nbsp;░░░░░░<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;███&nbsp;░███&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░██████                      <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░',
            '</div>',
            '<br><br>(Based on https://github.com/sasadjolic/dom-terminal)<br/><br/>',
            'Use \'help\' for available commands<br />',
            'Use \'cat README\' to display README file content',
            '</div>',
            '<div class="container">',
            '<output></output>',
            '<table class="input-line">',
            '<tr><td nowrap><div class="prompt">' + options.prompt + '/' + options.separator + '</div></td><td width="100%"><input class="cmdline" autofocus /></td></tr>',
            '</table>',
            '</div>'].join(''));
        var _container = _terminal.querySelector('.container');
        var _inputLine = _container.querySelector('.input-line');
        var _cmdLine = _container.querySelector('.input-line .cmdline');
        var _output = _container.querySelector('output');
        var _prompt = _container.querySelector('.prompt');
        var _background = document.querySelector('.background');

        var fileType = {
            FILE: 'file',
            DIRECTORY: 'directory',
            LINK: 'link'
        }

        var _fs = {
                    'name': '/',
                    'type': fileType.DIRECTORY,
                    'content': [
                        {
                            'name': 'blogs',
                            'type': fileType.DIRECTORY,
                            'content': [
                        	{
		                	'name': 'README',
		                	'type': fileType.FILE,
		                	'content': `My blog is actually under construction.
		                	`.replace(/\n/g, '<br />')
                        	}
                            ]
                        },
                        {
                            'name': 'resume',
                            'type': fileType.DIRECTORY,
                            'content': [
                                {
                                    'name': 'resume',
                                    'type': fileType.LINK,
                                    'content': 'public/cv.pdf'
                                },
                            ]
                        },
                        {
                            'name': 'tools',
                            'type': 'directory',
                            'content': [
                            	{
		                    'name': 'OSINT',
		                    'type': 'directory',
		                    'content': [
				                {
				                    'name':'phoneinfoga',
				                    'type':fileType.LINK,
				                    'content':'https://github.com/sundowndev/phoneinfoga',
				                },
				                {
				                    'name':'TheHarvester',
				                    'type':fileType.LINK,
				                    'content':'https://github.com/laramies/theHarvester',
				                },
                            		]
                        	},
                        	{
		                    'name': 'Post-exploitation',
		                    'type': 'directory',
		                    'content': [
				                {
				                    'name':'covermyass',
				                    'type':fileType.LINK,
				                    'content':'https://github.com/sundowndev/covermyass',
				                },
				                {
				                    'name':'mimikatz',
				                    'type':fileType.LINK,
				                    'content':'https://github.com/gentilkiwi/mimikatz',
				                },
                            		]
                        	},
                        	{
		                    'name': 'Cheatsheet',
		                    'type': 'directory',
		                    'content': [
				                {
				                    'name':'GTFOBins',
				                    'type':fileType.LINK,
				                    'content':'https://gtfobins.github.io/',
				                },
				                {
				                    'name':'hacktricks',
				                    'type':fileType.LINK,
				                    'content':'https://book.hacktricks.xyz/welcome/readme',
				                },
				                {
				                    'name':'WADComs',
				                    'type':fileType.LINK,
				                    'content':'https://wadcoms.github.io/',
				                }
                            		]
                        	},
                            ]
                        },
                        {
                            'name': 'contact',
                            'type': 'directory',
                            'content': [
                                {
                                    'name':'twitter',
                                    'type':fileType.LINK,
                                    'content':'https://twitter.com/WaykoDev',
                                },
                                {
                                    'name':'github',
                                    'type':fileType.LINK,
                                    'content':'https://github.com/WaykoDev',
                                },
                                {
                                    'name':'discord',
                                    'type':fileType.LINK,
                                    'content':'https://discordapp.com/invite/xxxxxx',
                                },
                            ]
                        },
                        {
                        	'name': 'README',
                        	'type': fileType.FILE,
                        	'content': `Hi, i'm Franck Chevalier.

                                        Welcome to my website. This is a simulated terminal that lets you
                                        browse through different directories, files, and links.

                                        You can display available commands using 'help' command.

                                        Please feel free to report any issue, and have fun.
                        	`.replace(/\n/g, '<br />')
                        }
                    ]
                };

        var availableCommands = {
            "about": {
                 "req_args":[],
                 "opt_args":[],
                 "description":"About this terminal",
                 "usage":"about"
            },
            "cat": {
                 "req_args":[
                 	"file"
                 ],
                 "opt_args":[],
                 "description":"Display files content",
                 "usage":"cat /tools/OSINT/phoneinfoga"
            },
            "cd": {
                 "req_args":[],
                 "opt_args":[
                    "directory"
                 ],
                 "description":"Change directory",
                 "usage":"cd /resume"
            },
           "clear": {
                 "req_args":[],
                 "opt_args":[],
                 "description":"Clear console content",
                 "usage":"clear"
            },
           "ls": {
                 "req_args":[],
                 "opt_args":[
                    "directory"
                 ],
                 "description":"List files and directories",
                 "usage":"ls /contact"
            },
           "ll": {
                 "req_args":[],
                 "opt_args":[
                    "directory"
                 ],
                 "description":"List files and directories",
                 "usage":"ll ./blogs"
            },
            "help, h, ?": {
                 "req_args":[],
                 "opt_args":[],
                 "description":"Display detailed help",
                 "usage":"help"
            },
            "hostname": {
                 "req_args":[],
                 "opt_args":[],
                 "description":"Show or set the system's host name",
                 "usage":"hostname"
            },
            "ifconfig": {
                 "req_args":[],
                 "opt_args":[],
                 "description":"Configure a network interface",
                 "usage":"ifconfig"
            },
           "open": {
                 "req_args":[
                 	 "link"
                 	],
                 "opt_args":[],
                 "description":"Open provided LINK",
                 "usage":"open /resume/resume"
            },
           "pwd": {
                 "req_args":[],
                 "opt_args":[],
                 "description":"Display current directory path",
                 "usage":"pwd"
            },
           "theme": {
                 "req_args":[],
                 "opt_args":[
                    "modern|interlaced|white"
                 ],
                 "description":"Display current theme or set new theme if argument is provided",
                 "usage":"theme white"
            },
           "version": {
                 "req_args":[],
                 "opt_args":[],
                 "description":"Display current version",
                 "usage":"version"
            },
            "whoami": {
                 "req_args":[],
                 "opt_args":[],
                 "description":"Print effective user name",
                 "usage":"whoami"
            }
        }

        var _currentPwd = ['/'];

        // Hackery to resize the interlace background image as the container grows.
        _output.addEventListener('DOMSubtreeModified', function(e) {
            // Works best with the scroll into view wrapped in a setTimeout.
            setTimeout(function() {
                _cmdLine.scrollIntoView();
            }, 0);
        }, false);

        if (options.welcome) {
            output(options.welcome);
        }

        window.addEventListener('click', function(e) {
            _cmdLine.focus();
        }, false);

        _output.addEventListener('click', function(e) {
            e.stopPropagation();
        }, false);

        // Always force text cursor to end of input line.
        _cmdLine.addEventListener('click', inputTextClick, false);
        _inputLine.addEventListener('click', function(e) {
            _cmdLine.focus();
        }, false);

        // Handle up/down key presses for shell history and enter for new command.
        _cmdLine.addEventListener('keyup', historyHandler, false);
        _cmdLine.addEventListener('keydown', processNewCommand, false);

        window.addEventListener('keyup', function(e) {
            _cmdLine.focus();
            e.stopPropagation();
            e.preventDefault();
        }, false);

        function inputTextClick(e) {
            this.value = this.value;
        }

        function historyHandler(e) {
        	console.log(e.keyCode);
            // Clear command-line on Escape key.
            if (e.keyCode == 27) {
                this.value = '';
                e.stopPropagation();
                e.preventDefault();
            }
            var TABKEY = 9;
	        if(e.keyCode == TABKEY) {
	            this.value += "    ";
	            if(e.preventDefault) {
	                e.preventDefault();
	            }
	            return false;
	        }

            if (_history.length && (e.keyCode == 38 || e.keyCode == 40)) {
                if (_history[_histpos]) {
                    _history[_histpos] = this.value;
                }
                else {
                    _histtemp = this.value;
                }

                if (e.keyCode == 38) {
                    // Up arrow key.
                    _histpos--;
                    if (_histpos < 0) {
                        _histpos = 0;
                    }
                }
                else if (e.keyCode == 40) {
                    // Down arrow key.
                    _histpos++;
                    if (_histpos > _history.length) {
                        _histpos = _history.length;
                    }
                }


                this.value = _history[_histpos] ? _history[_histpos] : _histtemp;

                // Move cursor to end of input.
                this.value = this.value;
            }
        }

        function processNewCommand(e) {
            // Only handle the Enter key.
            if (e.keyCode != 13) return;

            var cmdline = this.value;

            // Save shell history.
            if (cmdline) {
                _history[_history.length] = cmdline;
                localStorage['history'] = JSON.stringify(_history);
                _histpos = _history.length;
            }

            // Duplicate current input and append to output section.
            var line = this.parentNode.parentNode.parentNode.parentNode.cloneNode(true);
            line.removeAttribute('id')
            line.classList.add('line');
            var input = line.querySelector('input.cmdline');
            input.autofocus = false;
            input.readOnly = true;
            input.insertAdjacentHTML('beforebegin', input.value);
            input.parentNode.removeChild(input);
            _output.appendChild(line);

            // Hide command line until we're done processing input.
            _inputLine.classList.add('hidden');

            // Clear/setup line for next input.
            this.value = '';

            // Parse out command, args, and trim off whitespace.
            if (cmdline && cmdline.trim()) {
                var args = cmdline.split(' ').filter(function(val, i) {
                    return val;
                });
                var cmd = args[0];
                args = args.splice(1); // Remove cmd from arg list.
            }

            if (cmd) {
                var response = false;
                for (var index in extensions) {
                    var ext = extensions[index];
                    if (ext.execute) response = ext.execute(cmd, args);
                    if (response !== false) break;
                }
                if (response === false) response = cmd + ': command not found';
                output(response);
            }

            // Show the command line.
            _prompt.innerHTML = options.prompt + '/' + _currentPwd.slice(1).join('/') + options.separator;
            _inputLine.classList.remove('hidden');
        }

        function parsePath(path, currentPwd) {
            path = path.replace(/[/]{2,}/,'/').replace(/[/]$/, '');
            var pwd = path.split('/');
            if (pwd[0] == '') pwd[0] = '/';
            else pwd = currentPwd.concat(pwd);

            for (var i = 0; i < pwd.length; i++) {
                value = pwd[i];
                if (value == '.' || (value == '..' && i == 1)) {
                    pwd.splice(i, 1);
                    i--;
                }
                else if (value == '..') {
                    pwd.splice(i-1, 2);
                    i -= 2;
                }
            }
            return pwd;
        }

        function outputListing(directory) {
            if (directory.type != fileType.DIRECTORY) return [directory.name];
            var output = [];
            directory.content.forEach(function (file) {
                if (file.type == fileType.LINK) {
                    element = '<a href="' + file.content + '" class="external">' + file.name + '</a>';
                } else {
                    element = '<span class="' + file.type + '">' + file.name + '</span>';
                }
                output.push(element);
            });
            return output;
        }

        function listDirectory(directory) {
            if (directory.type != fileType.DIRECTORY) return [directory.name];
            var output = [];
            directory.content.forEach(function (file) {
                output.push(file.name);
            });
            return output;
        }

        function fileType(directory) {
            return directory.type;
        }

        function getFile(path) {
            
            var directory = _fs;
            var exists = true;
            var directoryListing, indexOfFile;

            for (var i = 1; i < path.length; i++) {
                var element = path[i];
                if (directory.type !== fileType.DIRECTORY) return {'error': true, 'result': directory.name + ': Not a directory'};
                directoryListing = listDirectory(directory);
                indexOfFile = directoryListing.indexOf(element);
                if (indexOfFile > -1) {
                    directory = directory['content'][indexOfFile];
                } else {
                    return {'error': true, 'result': element + ': Unknown file or directory'};
                }
            }
            return {'error': false, 'result': directory};
        }

        function clear() {
            _output.innerHTML = '';
            _cmdLine.value = '';
            _background.style.minHeight = '';
        }

        function output(html) {
            _output.insertAdjacentHTML('beforeEnd', html);
            _cmdLine.scrollIntoView();
        }

        return {
            clear: clear,
            displayHelp: function() {
            	var result = '<table class="help">';
            	var cmdName, cmdContent;

            	result += '<tr><td><span style="text-decoration: underline;">Available commands</span></td><td><span style="text-decoration:underline;">Description</span></td></tr>';

            	Object.entries(availableCommands).forEach(function (content) {
            		cmdName = content[0];
            		cmdContent = content[1];
            		result += '<tr><td nowrap>';
            		result += '<b>' + cmdName + '</b>';
            		if (cmdContent['opt_args'].length > 0) {
            			result += ' [<i>';
            			result += cmdContent['opt_args'].join('] [');
            			result += '</i>]';
            		}
            		if (cmdContent['req_args'].length > 0) {
            			result += ' <i>';
            			result += cmdContent['req_args'].join(' ');
            			result += '</i>';
            		}
            		result += '</i></td><td width="100%">';
            		result += cmdContent['description'] + '<br />';
            		result += 'Usage: ' + cmdContent['usage'];
            		result += '</td></tr>';
            	});
            	result += '</table>';
            	return result;
            },
            setPrompt: function(prompt) { _prompt.innerHTML = prompt + options.separator; },
            getPrompt: function() { return _prompt.innerHTML.replace(new RegExp(options.separator + '$'), ''); },
            setTheme: function(theme) { _terminal.classList.remove('terminal-' + options.theme); options.theme = theme; _terminal.classList.add('terminal-' + options.theme); },
            getTheme: function() { return options.theme; },
            listDirectory: function(directory) {
                var path = parsePath(directory, _currentPwd);
                var directory = getFile(path, _currentPwd);
                if (directory.error) return directory.result;
                return outputListing(directory.result).join('&nbsp;');
            },
            llistDirectory: function(directory) {
                var path = parsePath(directory, _currentPwd);
                var directory = getFile(path, _currentPwd);
                if (directory.error) return directory.result;
                return outputListing(directory.result).join('<br />');
            },
            changeDirectory: function(directory) {
                var path = parsePath(directory, _currentPwd);
                var directory = getFile(path, _currentPwd);
                if (directory.error) return directory.result;
                if (directory.result.type != fileType.DIRECTORY) return directory.result.name + ': Not a directory';
                _currentPwd = path;
                return '';
            },
            currentDirectory: function() { return '/' + _currentPwd.slice(1).join('/'); },
            catFile: function(file) {
                var path = parsePath(file, _currentPwd);
                var directory = getFile(path, _currentPwd);
                if (directory.error) return directory.result;
                if (directory.result.type == fileType.DIRECTORY) return directory.result.name + ': This is a directory';
                return directory.result.content;
            },
            openFile: function(file) {
                var path = parsePath(file, _currentPwd);
                var directory = getFile(path, _currentPwd);
                if (directory.error) return directory.result;
                if (directory.result.type == fileType.DIRECTORY) return directory.result.name + ': This is a directory';
                window.open(directory.result.content,'_blank');
                return ''
            }
        }
    };

    // node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Terminal;

    // web browsers
    } else {
        var oldTerminal = global.Terminal;
        Terminal.noConflict = function () {
            global.Terminal = oldTerminal;
            return Terminal;
        };
        global.Terminal = Terminal;
    }

})(this);
