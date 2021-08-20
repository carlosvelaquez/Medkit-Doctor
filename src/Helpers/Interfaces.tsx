interface GraphQLObject {
    _id: string,
    __typename: string
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