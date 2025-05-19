import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
 import * as React from 'react';

 
type ProPlanConfirmationEmailProps = {
  customerName: string
  supportEmail?: string
  dashboardUrl?: string
}

export const ProPlanConfirmationEmail = ({
  customerName,
  supportEmail = 'support@yourdomain.com',
  dashboardUrl = 'https://yourdomain.com/dashboard',
}: ProPlanConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Pro Plan is now active!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Welcome to the Pro Plan, {customerName} 🎉</Heading>
          <Text style={text}>
            We've received your one-time payment of <strong>$39</strong> for the <strong>Pro Plan</strong>.
           
          </Text>

          <Section style={{ textAlign: 'center', margin: '32px 0' }}>
            <Button href={dashboardUrl} style={button}>
              Go to Dashboard
            </Button>
          </Section>

          <Text style={text}>
            If you have any questions, feel free to reach out at{' '}
            <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
          </Text>

          <Text style={footer}>Thanks for joining us, <br /> The Your Company Team</Text>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f9f9f9',
  fontFamily: 'Arial, sans-serif',
  padding: '40px 0',
}

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '40px',
  maxWidth: '600px',
  margin: '0 auto',
}

const heading = {
  fontSize: '24px',
  marginBottom: '16px',
  textAlign: 'center' as const,
}

const text = {
  fontSize: '16px',
  color: '#444',
  lineHeight: '1.6',
}

const button = {
  backgroundColor: '#000',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: 600,
}

const footer = {
  fontSize: '14px',
  color: '#888',
  marginTop: '40px',
  textAlign: 'center' as const,
}
