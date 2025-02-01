// midtrans-client.d.ts
declare module 'midtrans-client' {
    export class Snap {
        constructor(options: { isProduction: boolean; serverKey: string; clientKey: string });
        createTransaction(parameter: any): Promise<any>;
        transaction: {
            notification(notificationJson: any): Promise<any>;
        };
    }

    export class CoreApi {
        constructor(options: { isProduction: boolean; serverKey: string; clientKey: string });
        // Tambahkan method lain yang diperlukan
    }
}