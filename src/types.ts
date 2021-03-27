export interface GrupoEquipamento {
    id: number;
    title: string;
}

export interface GrupoLubMachine {
    id: number;
    title: string;
}

export interface LubMachine {
    date: string;
    _id: string;
    name: string;
    procedures: LubProcedure[];
    field: string;
    typeEquip: string;
    __v: number;
    frequency: number;
    period: string;
    link?: string;
    lublink?:string;
    layout?:string;
    lineWasUp?: boolean
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
    link?: string;
    lineWasUp?: boolean
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
    userId: string;
    period: string;
    link?: string;
    report?: string;
    lineWasUp?: boolean;
}

export interface LubCheck {
    date: string;
    name: string;
    procedures: LubProcedure[];
    field: string;
    typeEquip: string;
    frequency: number;
    userId: string;
    period: string;
    lublink?: string;
    report?: string;
    lineWasUp?: boolean;
}

export interface CheckDashboardHome {
    date: string;
    name: string;
    procedures: Procedimento[];
    field: string;
    machineName: string;
    frequency: number;
    userId: string;
    period: string;
    kind:string;
}


export interface LubProcedure {
    _id: string;
    item: string;
    description: string;
    method: string;
    location: string;
    point: number;
    checked: boolean;
    condition: 'PARADA' | 'RODANDO';
    lubricant: string;
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
    name: string | undefined;
    _id: string | undefined;
}

export interface Relatorio {
    _id: string;
    period: string;
    frequency: number;
    date: Date;
    userId: string;
    field: string;
    machineName: string;
    report: string;
    arrayAllPages: Procedimento[] | LubProcedure[]; // procedimentos
}

export interface Porque {
    number: string;
    description: string;
}

export interface CincoPorquesInfo {
    _id: string;
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
    lineWasUp: boolean;
}

export interface LubrificacaoInfo {
    period: string;
    frequency: number;
    arrayAllPages: LubProcedure[][];
    date: Date;
    userId: string;
    field: string;
    machineName: string;
    report: string;
    lineWasUp: boolean;
}

export interface ChecksAndItensTotais {
    checks: number;
    itens: number;
}