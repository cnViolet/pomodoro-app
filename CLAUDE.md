# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

番茄钟桌面应用 (Pomodoro Timer) - A simple Electron-based Pomodoro timer for Windows.

## Commands

```bash
cd pomodoro-app

# Development
npm start          # Run app in development mode

# Build for Windows
npm run build     # Creates installer in dist/
```

## Architecture

**Main Process** (`main.js`): Creates the BrowserWindow (360x520, frameless), system tray, and handles IPC for window close and notifications.

**Preload** (`preload.js`): Uses contextBridge to expose `electronAPI` to renderer with `showNotification()` and `closeWindow()`.

**Renderer** (`renderer.js`): Vanilla JS timer logic. Modes: 专注 (focus, 25min) / 休息 (break, 5min). Timer countdown with system notification on completion.

**UI**: Single-page (`index.html` + `style.css`), frameless window with custom titlebar (draggable via `-webkit-app-region: drag`).

## Key Files

| File | Purpose |
|------|---------|
| `main.js` | Electron main process, window/tray creation |
| `preload.js` | Secure bridge: exposes `electronAPI` to renderer |
| `renderer.js` | Timer state machine, DOM event handlers |
| `index.html` | UI markup |
| `style.css` | Gradient background, custom titlebar styling |

## Communication

- Always respond in Chinese (中文交流)

## Notes

- No tests exist in this project
- No build step required for development (Electron loads files directly)
- Window hide-on-close behavior: clicking X hides to tray instead of quitting