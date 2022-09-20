// @ts-ignore
import styled from "styled-components";
import React, {useEffect, useState} from "react";

const TimerBoxContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  //width: 33%;

  @media only screen and (max-width: 400px) {
    width: auto;
  }
`

const TimerBoxContainer = styled.div`
  display: flex;
  justify-content: center;
`

const TimerBoxText = styled.p`
  display: flex;
  justify-content: center;
  font-weight: 700;
  margin-bottom: 10px;
`

const TimerBox = styled.p`
  display: flex;
  justify-content: center;
  font-size: 20px;
  width: auto;
  padding: 20px;
  border: white 0px solid;
  border-radius: 15px;
  box-shadow: inset 0px 0px 20px 2px;
  margin: 10px;
  @media only screen and (max-width: 500px) {
    font-size: 13px;
  }
`

const TimerBoxDuration = styled.p`
  display: flex;
  justify-content: center;
  font-size: 15px;
  width: auto;
  padding: 10px;
  margin: 5px;
  @media only screen and (max-width: 500px) {
    font-size: 13px;
  }
`

interface TimerInterface {
    endTs: number,
    callback: () => {}
}

// @ts-ignore
const BountyTimer: React.FC<TimerInterface> = ({endTs, callback}) => {

    const [timeInterval, setTimeInterval] = useState(endTs - Number(String(new Date().getTime()).slice(0, 10)));

    const [seconds, setSeconds] = useState(0)
    const [hours, setHours] = useState('0')
    const [minutes, setMinutes] = useState('0')

    const timestampToTime = () => {
        setHours(((timeInterval / 60) / 60).toFixed(0))
        setMinutes(((timeInterval / 60) % 60).toFixed(0))
        setSeconds(timeInterval % 60)
    }

    useEffect(() => {
        timestampToTime()
    }, [timeInterval])

    useEffect(() => {
        if (timeInterval === 0) {
            callback();
        }
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeInterval(timeInterval => timeInterval > 0 ? timeInterval - 1 : 0);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <TimerBoxContainerWrapper>
            <TimerBoxText>Time til next bounty</TimerBoxText>
            <TimerBoxContainer>
                {/*<TimerBox>{days.toString().padStart(2, '0')}</TimerBox>*/}
                <TimerBox>{hours.toString().padStart(2, '0')}</TimerBox>
                <TimerBox>{minutes.toString().padStart(2, '0')}</TimerBox>
                <TimerBox>{seconds.toString().padStart(2, '0')}</TimerBox>
            </TimerBoxContainer>
            <TimerBoxContainer>
                {/*<TimerBoxDuration>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Days&nbsp;</TimerBoxDuration>*/}
                <TimerBoxDuration>&nbsp;&nbsp;Hours&nbsp;</TimerBoxDuration>
                <TimerBoxDuration>Minutes</TimerBoxDuration>
                <TimerBoxDuration>Seconds</TimerBoxDuration>
            </TimerBoxContainer>
        </TimerBoxContainerWrapper>
    );
};

export default BountyTimer;
