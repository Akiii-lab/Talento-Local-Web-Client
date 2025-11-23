export interface Notification {
    id_notificacion: string;
    id_usuario: string;
    id_empresa: string;
    asunto: string;
    mensaje: string;
    id_oferta: number;
    prioridad: number;
    datos_adicionales?: string;
    leida: string;
    fecha_lectura: string;
    fecha_creacion: string;
}


