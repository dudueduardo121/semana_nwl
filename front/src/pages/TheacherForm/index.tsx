import React, { useState, FormEvent }from 'react';
import PageHeader from '../../components/PageHeader';
import { useHistory } from 'react-router-dom';

import './style.css';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import warningIcon from '../../assets/images/icons/warning.svg';
import Select from '../../components/Select';
import api from '../../services/api';


function TheacherForm(){

    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

/*     const [sheduleItems, setScheduleItems] = useState([
        {   
            week_day: 0,
            from: '',
            to: ''
        }
    ]); */

/*     function addNewSheduleItem() {
        setScheduleItems([
            ...sheduleItems,
            {
                week_day: 0,
                from: '',
                to: ''
            }
        ]);
    } */


    //sobre a aula

/*     function setScheduleItemValue(position: number, field: string, value: string){
        const newArray = sheduleItems.map((sheduleItem, index) => {
            if(index === position){
                return { ...sheduleItem, [field]: value };
            }

            return sheduleItem;
        });

        setScheduleItems(newArray);
        console.log(newArray);
    } */

    // seus dados
    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            //shedule: sheduleItems

        }).then(() => {
            alert('Cadastro realizado com sucesso');
            history.push('/');
        }).catch(()=>{
            alert('Erro no cadastro');
        });

    }




    return(
        <div id="page-teacher-form" className="container">
        <PageHeader 
            title="Que incrivel que você quer dar aulas."
            description="O primeiro passo e preecher esse formulario de inscrição"
        />

        <main>
            <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>
                    <Input 
                        name="name" 
                        label="Nome Completo" 
                        value={name} 
                        onChange={(e) => {setName(e.target.value)}} 
                    />

                    <Input 
                        name="avatar" 
                        label="Avatar" 
                        value={avatar} 
                        onChange={(e) => {setAvatar(e.target.value)}} 
                    />

                    <Input 
                        name="whatsapp" 
                        label="Whatsapp" 
                        value={whatsapp} 
                        onChange={(e) => {setWhatsapp(e.target.value)}} 
                    />

                    <Textarea 
                        name="bio" 
                        label="Biografia" 
                        value={bio} 
                        onChange={(e) => {setBio(e.target.value)}} 
                    />

                </fieldset>

                <fieldset>
                    <legend>Sobre a aula</legend>
                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={(e) => {setSubject(e.target.value)}}
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
                    <Input 
                        name="cost" 
                        label="Custo hora por aula" 
                        value={cost} onChange={(e) => {setCost(e.target.value)}} 
                    />
                    
                </fieldset>

{/*                 <fieldset>
                    <legend>Horários disponíveis
                        <button type="button" onClick={addNewSheduleItem}>+ Novo horário</button>
                    </legend>

                    {sheduleItems.map((sheduleItem, index) => {
                        return (
                            <div key={sheduleItem.week_day} className="shedule-item">
                                <Select
                                name="week_day" 
                                label="Dia da semana"
                                value={sheduleItem.week_day}
                                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                                <Input 
                                    type="time" 
                                    name="from" 
                                    label="Das" 
                                    value={sheduleItem.from} 
                                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                />
                                <Input 
                                    type="time" 
                                    name="to" 
                                    label="Até" 
                                    value={sheduleItem.to} 
                                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                />
                            </div>
                        )

                    })}


                    
                    
                </fieldset>
 */}

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/>
                        Importante! <br/>
                        Preecha todos os dados
                    </p>
                    <button type="submit">Salvar cadastro</button>
                </footer>
            </form>
        </main>
    </div>
    );
}

export default TheacherForm;