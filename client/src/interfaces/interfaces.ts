
export interface CalendarEvent {
   _id: string,
   dateTime: Date,
   name: string,
   reminder?: {
      _id: string,
      dateTime: Date,
      description?: string
   },
   description?: string,
   location?: string,
   guests?: string
}

export interface Task {
   _id: string,
   dateTime: Date,
   name: string,
   description?: string
}

export interface Reminder {
   _id: string,
   dateTime: Date,
   subject: string,
   description?: string,
   repeat?: [string]
}

export interface Note {
   _id: string,
   date: Date,
   text: string,
   title?: string
}

export interface Action {
   type: string,
   payload?: any
}