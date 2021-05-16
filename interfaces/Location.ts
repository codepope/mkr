export default interface Location {
    id: number,
    createdbyid: string,
    created: Date, // Location created when?
    name: string, // What is the location called
    latlon: [number,number],
  }