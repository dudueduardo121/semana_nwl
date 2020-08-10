import React, { useState, FormEvent } from 'react';

import './style.css'
import PageHeader from '../../components/PageHeader';
import TheacherItem, { Teacher } from '../../components/TeacherItem';
//import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';



function TheacherList(){

    const [teachers, setteachers] = useState([]);

    const [subject, setSubject] = useState('');
    //const [week_day, setWeek_day] = useState('');
    //const [time, setTime] = useState('');

    async function searchteachers(e: FormEvent){
        e.preventDefault();

      const response = await api.get('/classes', {
            params: {
                subject
            }

        });

        console.log(response.data);
        setteachers(response.data);
    }

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os professores disponiveis">
                <form id="search-teachers" onSubmit={searchteachers}>
                    <Select
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={e => { setSubject(e.target.value)}}
                        options={[
                            {value: 'Asp classic', label: 'Asp classic'},
                            {value: 'PHP', label: 'PHP'},
                            {value: 'C#', label: 'C#'},
                            {value: 'Python', label: 'Python'},
                            {value: 'JavaScript', label: 'JavaScript'},
                            {value: 'CSS', label: 'CSS'},
                            {value: 'HTML', label: 'HTML'},
                        ]}
                    />
                    {/* <Select
                        name="week_day" 
                        label="Dia da semana"
                        options={[
                            {value: '0', label: 'Domingo'},
                            {value: '1', label: 'Segunda-feira'},
                            {value: '2', label: 'Terça-feira'},
                            {value: '3', label: 'Quarta-feira'},
                            {value: '4', label: 'Quinta-feira'},
                            {value: '5', label: 'Sexta-feira'},
                            {value: '6', label: 'Sabado'}
                        ]}
                    />
                    <Input type="time" name="time" label="Hora"/> */}
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TheacherItem key={teacher.id} teacher={teacher}/>
                })}
                
            </main>
        </div>
    );
}

export default TheacherList;