export interface GrupoEquipamento {
    id: number;
    title: string;
}

export interface Equipamento {
    date: string;
    _id: string;
    name: string;
    procedures: Procedimento[];
    field: string;
    typeEquip: string;
    __v: number;
    frequency: number;
    period: string;
}
export interface Operarios {
    _id: string;
    password: string;
    name: string;
    userId: string;
    field: string;
    admin: boolean;

}

export interface Check {
    date: string;
    name: string;
    procedures: Procedimento[];
    field: string;
    typeEquip: string;
    frequency: number;
    period: string;
}

export interface Procedimento {
    _id: string;
    item: string;
    description: string;
    method: string;
    location: string;
    point: number;
    condition: 'PARADA' | 'RODANDO';
    checked: boolean;
}

export interface User {
    userId: string | undefined;
    admin: boolean;
    field: string | undefined;
}

export interface Relatorio {
    period: string;
    frequency: number;
    date: Date;
    userId: string;
    field: string;
    machineName: string;
    report: string;
    arrayAllPages: Procedimento[]; // procedimentos
}

export interface Porque {
    number: string;
    description: string;
}

export interface CincoPorquesInfo {
    use: string;
    cause: string;
    comment: string;
    corrective: string;
    date: Date;
    descriptionAnomaly: string;
    deterioration: string;
    equip: string;
    field: string;
    maintenanceNotes: string;
    maintenanceOrder: string;
    shift: string;
    tag: string;
    userId: string;
    whys: Porque[];
}

export interface LimpezaInspecaoInfo {
    period: string;
    frequency: number;
    arrayAllPages: Procedimento[][];
    date: Date;
    userId: string;
    field: string;
    machineName: string;
    report: string;
}
