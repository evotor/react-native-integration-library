export class User {
    constructor(uuid: string,
                secondName: string | null,
                firstName: string | null,
                phone: string | null,
                pin: string | null,
                roleUuid: string,
                roleTitle: string) {
        this.uid = uuid;
        this.secondName = secondName;
        this.firstName = firstName;
        this.phone = phone;
        this.pin = pin;
        this.roleUuid = roleUuid;
        this.roleTitle = roleTitle;
    }
}

export class Grant {
    constructor(title: string, roleUuid: string) {
        this.title = title;
        this.roleUuid = roleUuid
    }
}