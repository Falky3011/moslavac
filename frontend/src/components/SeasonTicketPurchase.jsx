import React from 'react';
import { Card, Typography, Image } from 'antd';
import uplatnica from '../assets/uplatnica.png'
const { Title, Paragraph } = Typography;

export default function SeasonTicketPurchase() {
    return (
        <div className="max-w-3xl mx-auto p-6 rounded-3xl shadow-xl bg-gray-50 my-20">

            <Card className='bg-gray-50 border-none'>
                <Title level={2} className="text-center text-xl">Postani naš 12. igrač!</Title>
                <Paragraph className='text-lg'>
                    Napravili smo članske iskaznice za narednu sezonu. Cijena članske iskaznice je 30 eura te se može kupiti uplatom na račun od SNK Moslavca. Također, članske iskaznice će se moći kupiti na tribini na svakoj domaćoj utakmici.
                </Paragraph>
                <Paragraph className='text-lg'>
                    Svi zainteresirani za kupnju članske iskaznice neka se jave u inbox stranice ili nekom od članova uprave.
                </Paragraph>
                <Paragraph strong className='text-lg'>
                    Napomena: Godišnja ulaznica vrijedi za domaće utakmice u 4. NL Središte B, kup utakmice i europske utakmice od 1.8.2024. do 31.7.2025.
                </Paragraph>

                {/* Podaci za uplatu */}
                <div className="mt-6">
                    <Title level={3}>Podaci za uplatu:</Title>
                    <Paragraph className='text-lg'>
                        IBAN: HR7023400091100077909<br />
                        Primatelj: SNK Moslavac Kutinska 10 44317 Popovača<br />
                        Iznos: 30 EUR<br />
                        Opis plaćanja: Članarica 2024-25 - [Vaše ime i prezime]
                    </Paragraph>
                </div>

                {/* Uplatnica slika */}
                <div className="mt-6">
                    <Image
                        src={uplatnica}
                        alt="Uplatnica"
                        className="w-full h-auto max-w-md mx-auto object-contain"
                    />
                </div>
            </Card>
        </div>
    );
}
