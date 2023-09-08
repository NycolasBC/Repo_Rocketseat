import styled from "styled-components";


export const HomeContainer = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`;

export const BaseCountDownButton = styled.button`
    width: 40.5rem;
    height: 4rem;
    border: 0;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${props => props.theme['gray-100']};

    gap: 0.5rem;
    font-weight: bold;
    
    cursor: pointer;

    &:disabled {
        opacity: 70%;
        cursor: not-allowed;
    }    
`;

export const StartCountdownButton = styled(BaseCountDownButton)`
    background: ${props => props.theme['green-500']};

    &:not(:disabled):hover{
        background: ${props => props.theme['green-700']};
    }
`;

export const StopCountdownButton = styled(BaseCountDownButton)`
    background: ${props => props.theme['red-500']};

    &:not(:disabled):hover{
        background: ${props => props.theme['red-700']};
    }
`;