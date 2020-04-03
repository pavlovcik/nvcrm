import Meta from "./Meta";

export default interface Client {
    meta: Meta;
    contact: {
        name: string;
        role: string;
        email: string;
        address: string;
        phone: string;
    };
    entity: {
        dba: string;
        name: string;
    };
}