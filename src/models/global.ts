import express from 'express'
export type Controller = (app: express.Express) => void
