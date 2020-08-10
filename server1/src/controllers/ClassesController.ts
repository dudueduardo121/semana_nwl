import {Request, Response} from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

/* interface SheduleItem {
    week_day: number;
    from: string;
    to: string;
} */

export default class ClassesController {

    /* CREATE */    
    async create(request: Request, response: Response){

        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            dia
        } = request.body;
     
        const trx = await db.transaction();
     
        try {
             // INSERIR USUARIOS
             const insertedUsersId = await trx('users').insert({
                 name,
                 avatar,
                 whatsapp,
                 bio,
             }).returning('id');
         
             // INSERIR CLASSES 
             const user_id = insertedUsersId[0];
         
             await trx('classes').insert({
                 subject,
                 cost,
                 user_id,
             }).returning('id');
         
/*              // INSERIR CLASS_SHEDULE 
             const class_id = insertedClassesIds[0];
             
             const classSchedule = await trx('class_shedule').insert({
                dia,
                class_id,
             });
         
             await trx('class_schedule').insert(classSchedule); 
          */
         
             await trx.commit();
             return response.status(201).send();
     
        } catch (err) {
            
            await trx.rollback();
            //console.log(err);

            return response.status(400).json({
                error: 'Erro inesperado ao criar uma nova classe'
            })
            
        }
     }


    /* LIST*/
    async index(request: Request, response: Response){
    
        const filters = request.query;
        const subject = filters.subject as string;
        //const dia = filters.dia as string;
        //const time = filters.time as string;

        const classes = await db('classes')
            .select(['u.*', 'la.*'])// seleciona todos os dados das 2 tabelas
            .from('classes AS u')
            .join('users AS la', 'la.id', 'u.user_id')
            .where('u.subject', '=', subject);
        
        //console.log(classes);
        return response.json(classes);

    } 
}