class ParentAccessor {
    private _managedOwner: any;
    private static _managedGetJsonValue: (managedOwner: any, name: string) => string;
    private static _managedCallAction: (managedOwner: any, name: string) => boolean;
    private static _managedCallActionWithParameters: (managedOwner: any, name: string, parameters: string[]) => boolean;
    private static _managedCallEvent: (managedOwner: any, name: string, parameters: string[]) => Promise<string>;
    private static _managedClose: (managedOwner: any) => void;

    constructor(managedOwner: any) {
        this._managedOwner = managedOwner;
    }

    public static async setup() {
        let anyModule = (<any>window).Module;

        if (anyModule.getAssemblyExports !== undefined) {
            const browserExports = await anyModule.getAssemblyExports("MonacoEditorComponent");

            ParentAccessor._managedGetJsonValue = browserExports.Monaco.Helpers.ParentAccessor.ManagedGetJsonValue;
            ParentAccessor._managedCallAction = browserExports.Monaco.Helpers.ParentAccessor.ManagedCallAction;
            ParentAccessor._managedCallActionWithParameters = browserExports.Monaco.Helpers.ParentAccessor.ManagedCallActionWithParameters;
            ParentAccessor._managedCallEvent = browserExports.Monaco.Helpers.ParentAccessor.ManagedCallEvent;
            ParentAccessor._managedClose = browserExports.Monaco.Helpers.ParentAccessor.ManagedClose;
        }
    }

    public getJsonValue(name: string): string {
        return ParentAccessor._managedGetJsonValue(this._managedOwner, name);
    }

    public callAction(name: string): boolean {
        return ParentAccessor._managedCallAction(this._managedOwner, name);
    }

    public callActionWithParameters(name: string, parameters: string[]): boolean {
        return ParentAccessor._managedCallActionWithParameters(this._managedOwner, name, parameters);
    }

    public async callEvent(name: string, parameters: string[]): Promise<string> {
        return ParentAccessor._managedCallEvent(this._managedOwner, name, parameters);
    }

    public close(): void {
        ParentAccessor._managedClose(this._managedOwner);
    }

    //getChildValue(name: string, child: string): Promise<any>;
    //getJsonValue(name: string): Promise<string>;
    //getValue(name: string): Promise<any>;
    public async setValue(name: string, value: any): Promise<void> {
        console.log("setValue is not implemented")
    }

    public setValueWithType(name: string, value: string, type: string) {
        console.log("setValueWithType is not implemented")
    }

    //callActionWithParameters(name: string, parameter1: string, parameter2: string): boolean;
    //callEvent(name: string, callbackMethod: string, parameter1: string, parameter2: string);
}



////namespace Monaco.Helpers {
//    interface ParentAccessor {
//        callAction(name: string): boolean;
//        callActionWithParameters(name: string, parameters: string[]): boolean;
//        callEvent(name: string, parameters: string[]): Promise<string>
//        close();
//        getChildValue(name: string, child: string): Promise<any>;
//        getJsonValue(name: string): Promise<string>;
//        getValue(name: string): Promise<any>;
//        setValue(name: string, value: any): Promise<undefined>;
//        setValue(name: string, value: string, type: string): Promise<undefined>;
//        setValueWithType(name: string, value: string, type: string);
//        callActionWithParameters(name: string, parameter1: string, parameter2: string): boolean;
//        callEvent(name: string, callbackMethod: string, parameter1: string, parameter2: string);
//        getJsonValue(name: string, returnId: string);
//}

////}