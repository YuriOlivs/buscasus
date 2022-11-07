import { useEffect, useState } from 'react';
import axios from 'axios';

import { MenuBackground } from '../../../components/Menu';
import { MenuLinksHospital } from '../../../components/MenuLinks/MenuLinksHospital';
import { BarChart, PieChart } from '../../../components/Charts';

import { Activity, Syringe, ThumbsDown, ChatCenteredDots, CaretUp, X } from 'phosphor-react';

import * as C from './styles'

export function VisaoGeralHospital() {
    const [claimCount, setClaimCount] = useState<string>();
    const [dutyCount, setDutyCount] = useState<string>();
    const [medicsCount, setMedicsCount] = useState<string>();

    const date = new Date();
    let weekDay = date.getDay();
    let day: any = "" + date.getDate();
    let month: any = date.getMonth() + 1;
    let year = "" + date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    const weekDays: any = {
        0: "domingo",
        1: "segunda-feira",
        2: "terça-feira",
        3: "quarta-feira",
        4: "quinta-feira",
        5: "sexta-feira",
        6: "sábado"
    }

    const getHospitalId: any = localStorage.getItem("hospital_id");
    const hospitalId = JSON.parse(getHospitalId);

    useEffect(() => {
        axios.get('http://localhost/buscaSusWeb/api/area-usuario/reclamacao/', {
            params: {
                hospitalCount: true,
                idHospital: hospitalId
            }
        }).then(response => setClaimCount(response.data.idReclamacao));

        axios.get('http://localhost/buscaSusWeb/api/area-hospital/plantao/', {
            params: {
                hospitalCount: true,
                idHospital: hospitalId
            }
        }).then(response => setDutyCount(response.data.idPlantao));

        axios.get('http://localhost/buscaSusWeb/api/area-hospital/medico/', {
            params: {
                hospitalCount: true,
                idHospital: hospitalId
            }
        }).then(response => setMedicsCount(response.data.idMedico));
    }, []);

    return (
        <MenuBackground menuLinks={<MenuLinksHospital />}>
            <C.TopContainer>
                <C.TitleDiv>
                    <C.Title>Dashboard</C.Title>
                    <C.SubTitle>{weekDays[weekDay]}, {`${day}/${month}/${year}`}</C.SubTitle>
                </C.TitleDiv>
            </C.TopContainer>
            <C.DashboardContent>
                <C.LeftContainer>
                    <C.Quantities>
                        <C.Icons color='#49B28C'>
                            <ChatCenteredDots size={70} />
                            <C.TextContainer>
                                <span>Reclamações</span>
                                <span>{claimCount}</span>
                            </C.TextContainer>
                        </C.Icons>
                        <C.Icons color='#349684'>
                            <Activity size={70} />
                            <C.TextContainer>
                                <span>Plantões</span>
                                <span>{dutyCount}</span>
                            </C.TextContainer>
                        </C.Icons>
                        <C.Icons color='#496461'>
                            <Syringe size={70} />
                            <C.TextContainer>
                                <span>Médicos</span>
                                <span>{medicsCount}</span>
                            </C.TextContainer>
                        </C.Icons>
                    </C.Quantities>
                    <C.ChartContainer>
                        <h3>Ausências nos últimos 4 meses</h3>
                        <BarChart.Line />
                    </C.ChartContainer>
                    <C.ChartContainer>
                        <h3>Porcentagem de médicos por especialidade</h3>
                        <PieChart.Specialty />
                    </C.ChartContainer>
                </C.LeftContainer>
                <C.Line />
                <C.RightContainer>
                    <C.ChartContainer>
                        <h3>Satisfação dos pacientes</h3>
                        <PieChart.Opinion />
                    </C.ChartContainer>
                    <C.ChartContainer>
                        <h3>Pesquisas pelo hospital no último mês</h3>
                        <BarChart.Search />
                    </C.ChartContainer>
                </C.RightContainer>
            </C.DashboardContent>
        </MenuBackground>
    )
}