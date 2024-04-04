export class Blog {
    _id:string;
    title: string;
    content: string;
    location: string;
    experience: string;
    username: string;
    mobile: string;
    image:string;
    date: string;
    // Add an index signature to allow dynamic properties
    [key: string]: string;




}
