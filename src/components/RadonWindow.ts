import { BrowserWindow } from 'electron'

export class RadonWindowManager
{
    private windowMap: Map<string, RadonWindow>;

    constructor(windows?: object)
    {
        this.windowMap = new Map();
        
        if (windows)
        {
            for (const [name, window] of Object.entries(windows))
            {
                this.registerWindow(name, window);
            }
        }
    }

    createWindow(name: string, options?: Electron.BrowserWindowConstructorOptions)
    {
        let newWin = new RadonWindow(this, options);
        this.windowMap.set(name, newWin);

        return newWin;
    }

    destroyWindow(name: string)
    {
        let win = this.unregisterWindow(name);
        if (win)
        {
            win.native.destroy();
        }
    }

    registerWindow(name: string, window: RadonWindow): void
    {
        window.setManager(this);
        this.windowMap.set(name, window);
    }

    /**
     * Unregister the window with the 'name' and returns the instance (undefined if not)
     * @param name the identifier that the window was registered with
     */
    unregisterWindow(name: string): RadonWindow | undefined
    {
        let win = this.windowMap.get(name);
        if (win)
        {
            this.windowMap.delete(name);
            win.setManager(null);
        }

        return win;
    }

    unregisterWindowInst(window: RadonWindow): RadonWindow | undefined
    {
        let found = undefined;

        for (let win of this.windowMap.values())
        {
            if (win.native.id === window.native.id)
            {
                found = win;
                break;
            }
        }

        return found;
    }

    activateWindow(name: string)
    {
        let win = this.windowMap.get(name);
        if (win && !win.isActive())
        {
            win.setActive(true);
        }
    }

    deactivateWindow(name: string)
    {
        let win = this.windowMap.get(name);
        if (win && win.isActive())
        {
            win.setActive(false);
        }
    }

    getRegisteredWindow(name: string): RadonWindow | undefined
    {
        return this.windowMap.get(name);
    }

    isRegistered(name: string): boolean
    {
        return this.windowMap.has(name);
    }

    /**
     * Retreives the active window with the name (returns null if none)
     * @param name the name used to search for the window
     */
    getActiveWindow(name: string): RadonWindow | null
    {
        let win = this.windowMap.get(name);
        return win && win.isActive()? win : null;
    }

    isActive(name: string): boolean
    {
        return this.getActiveWindow(name) !== null;
    }

    get registeredWindows(): Array<RadonWindow>
    {
        return Array.from(this.windowMap.values());
    }

    get activeWindows(): Array<RadonWindow>
    {
        return this.registeredWindows.filter((win) => win.isActive());
    }
}

export class RadonWindow
{
    private nativeObject: BrowserWindow;
    private parentManager: RadonWindowManager | null;
    private bActive: boolean;
    private boundRoute: string;
    
    bFocusWhenActive: boolean;

    constructor(parentManager: RadonWindowManager, options?: Electron.BrowserWindowConstructorOptions)
    {
        this.parentManager = parentManager;
        this.nativeObject = new BrowserWindow(Object.assign({}, options, { show: false }));
        this.nativeObject.on('closed', () => { if (this.parentManager) this.parentManager.unregisterWindowInst(this) });

        this.bActive = false;
        this.boundRoute = '/';
        this.bFocusWhenActive = true;
    }

    get native(): BrowserWindow
    {
        return this.nativeObject;
    }

    setManager(parentManager: RadonWindowManager | null)
    {
        this.parentManager = parentManager;
    }

    get manager(): RadonWindowManager | null
    {
        return this.parentManager;
    }

    setActive(bActive: boolean)
    {
        if (bActive && !this.bActive)
        {
            if (this.bFocusWhenActive)
            {
                this.nativeObject.show();
            }
            
            else
            {
                this.nativeObject.showInactive();
            }
        }
        
        else if (!bActive && this.bActive)
        {
            this.nativeObject.hide();
        }

        this.bActive = bActive;
    }

    isActive(): boolean
    {
        return this.bActive;
    }

    bind(route: string): RadonWindow
    {
        this.boundRoute = route;

        return this;
    }

    apply(): RadonWindow
    {
        this.nativeObject.loadURL(`http://localhost:3000/${this.boundRoute}`);

        return this;
    }
}