export type Unique<T extends object> = T & { id: string }

export type Roles = 'admin' | 'user'
