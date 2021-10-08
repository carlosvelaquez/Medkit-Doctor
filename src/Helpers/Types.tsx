export enum Gender {
    Male,
    Female,
    Other,
}

export enum MaritalStatus {
    Single,
    Married,
    Divorced,
    Widowed,
    FreeUnion,
    Other,
}


interface GraphQLObject {
    _id: string,
    __typename: string
}

export interface Patient extends GraphQLObject {
    firstName: string,
    middleName: string,
    firstSurname: string,
    secondSurname: string,
    profilePicture: string,
    gender: Gender,
    occupation: string,
    maritalStatus: MaritalStatus,
    birthDate: Date
}

export interface Consultation extends GraphQLObject {
    visit: string,
    datetime: Date,
    chiefConcern: string,
}

export interface Visit extends GraphQLObject {
    patient: string,
    startTime: Date,
    endTime: Date,
    events: Array<Consultation>
}