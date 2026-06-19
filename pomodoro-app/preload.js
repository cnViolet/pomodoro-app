const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  showNotification: (title, body) => {
    try {
      new Notification({ title, body }).show();
    } catch (e) {
      // 通知权限被拒或平台不支持，静默忽略
    }
  },
  closeWindow: () => {
    ipcRenderer.send('close-window');
  }
});