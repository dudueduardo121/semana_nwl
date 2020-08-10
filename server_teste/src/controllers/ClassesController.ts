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
            schedule
        } = request.body;
     
        const trx = await db.transaction();
     
        try {
             // INSERIR USUARIOS
             const insertedUsersId = await trx('users').insert({
                 name,
                 avatar,
                 whatsapp,
                 bio,
             });
         
             // INSERIR CLASSES 
             const user_id = insertedUsersId[0];
         
             const insertedClassesIds = await trx('classes').insert({
                 subject,
                 cost,
                 user_id,
             });
         
             // INSERIR CLASS_SHEDULE 
/*              const class_id = insertedClassesIds[0];
             
             const classSchedule = schedule.map((scheduleItem: SheduleItem) => {
                 return {
                     class_id,
                     week_day: scheduleItem.week_day,
                     from: convertHourToMinutes(scheduleItem.from),
                     to: convertHourToMinutes(scheduleItem.to),
                 };
             })
         
             await trx('class_schedule').insert(classSchedule); */
         
         
             await trx.commit();
             return response.status(201).send();
     
        } catch (err) {
            
            //await trx.rollback();
            console.log(err);

            return response.status(400).json({
                error: 'Erro inesperado ao criar uma nova classe'
            })
            
        }
     }


    /* LIST*/
    async index(request: Request, response: Response){
    
        const filters = request.query;
        const subject = filters.subject as string;
        //const week_day = filters.week_day as string;
        //const time = filters.time as string;



        if(!subject){
            return response.status(400).json({
                error: 'Filtros não preechidos para pesquisa'
            })
        }

        //converter time in minutes
        //const timeinMinutes = convertHourToMinutes(time); // diz que time e uma string
        //console.log(timeinMinutes);

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    //.whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    //.whereRaw('`class_schedule`.`from` <= ??', [timeinMinutes])
                    //.whereRaw('`class_schedule`.`to` > ??', [timeinMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', '=', 'users.id')
            .select(['classes.*', 'users.*']);// seleciona todos os dados das 2 tabelas

        return response.json(classes);

    } 
}