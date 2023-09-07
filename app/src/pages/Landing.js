import React from 'react'
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Link,
  Divider,
  Image,
} from '@chakra-ui/react'

import logo from '../assets/images/r-logo.png'

const Landing = () => {
  return (
    <Box
      maxW='800px'
      mx='auto'
    >
      <Box
        borderRadius='full' // Make the box a circle
        bg='teal.500' // Background color
        display='flex'
        justifyContent='center'
        alignItems='center'
        boxShadow='md' // Add a shadow
        w='400px'
        p='20px'
        mt='20px'
        textAlign='center'
      >
        <Image
          src={logo}
          alt='logo'
          boxSize='80%' // Adjust the image size within the box
        />
      </Box>

      <Box
        mt='4'
        textAlign='left'
      >
        <Heading
          as='h1'
          size='lg'
          mb='4'
        >
          Privacy Policy
        </Heading>

        <Text>
          Resonate Business Ignition built the Daily Update app as a Free app.
          This SERVICE is provided by Resonate Business Ignition at no cost and
          is intended for use as is.
        </Text>

        <Text mt='4'>
          This page is used to inform visitors regarding our policies with the
          collection, use, and disclosure of Personal Information if anyone
          decided to use our Service.
        </Text>

        <Text mt='4'>
          If you choose to use our Service, then you agree to the collection and
          use of information in relation to this policy. The Personal
          Information that we collect is used for providing and improving the
          Service. We will not use or share your information with anyone except
          as described in this Privacy Policy.
        </Text>

        <Text mt='4'>
          The terms used in this Privacy Policy have the same meanings as in our
          Terms and Conditions, which are accessible at Daily Update unless
          otherwise defined in this Privacy Policy.
        </Text>

        <Heading
          as='h2'
          size='lg'
          mt={6}
          mb={4}
        >
          Information Collection and Use
        </Heading>

        <Text mt='4'>
          For a better experience, while using our Service, we may require you
          to provide us with certain personally identifiable information. The
          information that we request will be retained by us and used as
          described in this privacy policy.
        </Text>

        <Heading
          as='h2'
          size='lg'
          mt={6}
          mb={4}
        >
          Log Data
        </Heading>

        <Text mt='4'>
          We want to inform you that whenever you use our Service, in a case of
          an error in the app we collect data and information (through
          third-party products) on your phone called Log Data. This Log Data may
          include information such as your device Internet Protocol (“IP”)
          address, device name, operating system version, the configuration of
          the app when utilizing our Service, the time and date of your use of
          the Service, and other statistics.
        </Text>

        <Heading
          as='h2'
          size='lg'
          mt={6}
          mb={4}
        >
          Cookies
        </Heading>

        <Text mt='4'>
          Cookies are files with a small amount of data that are commonly used
          as anonymous unique identifiers. These are sent to your browser from
          the websites that you visit and are stored on your device's internal
          memory.
        </Text>

        <Text mt='4'>
          This Service does not use these “cookies” explicitly. However, the app
          may use third-party code and libraries that use “cookies” to collect
          information and improve their services. You have the option to either
          accept or refuse these cookies and know when a cookie is being sent to
          your device. If you choose to refuse our cookies, you may not be able
          to use some portions of this Service.
        </Text>

        <Heading
          as='h2'
          size='lg'
          mt={6}
          mb={4}
        >
          Service Providers
        </Heading>
        <Text>
          We may employ third-party companies and individuals due to the
          following reasons:
        </Text>
        <Text>
          <ul>
            <li>To facilitate our Service;</li>
            <li>To provide the Service on our behalf;</li>
            <li>To perform Service-related services; or</li>
            <li>To assist us in analyzing how our Service is used.</li>
          </ul>
        </Text>
        <Text>
          We want to inform users of this Service that these third parties have
          access to their Personal Information. The reason is to perform the
          tasks assigned to them on our behalf. However, they are obligated not
          to disclose or use the information for any other purpose.
        </Text>

        <Heading
          as='h2'
          size='lg'
          mt={6}
          mb={4}
        >
          Security
        </Heading>
        <Text>
          We value your trust in providing us your Personal Information, thus we
          are striving to use commercially acceptable means of protecting it.
          But remember that no method of transmission over the internet, or
          method of electronic storage is 100% secure and reliable, and we
          cannot guarantee its absolute security.
        </Text>

        <Heading
          as='h2'
          size='lg'
          mt={6}
          mb={4}
        >
          Links to Other Sites
        </Heading>
        <Text>
          This Service may contain links to other sites. If you click on a
          third-party link, you will be directed to that site. Note that these
          external sites are not operated by us. Therefore, we strongly advise
          you to review the Privacy Policy of these websites. We have no control
          over and assume no responsibility for the content, privacy policies,
          or practices of any third-party sites or services.
        </Text>

        <Heading
          as='h2'
          size='lg'
          mt={6}
          mb={4}
        >
          Children’s Privacy
        </Heading>
        <Text>
          We do not knowingly collect personally identifiable information from
          children. We encourage all children to never submit any personally
          identifiable information through the Application and/or Services. We
          encourage parents and legal guardians to monitor their children's
          Internet usage and to help enforce this Policy by instructing their
          children never to provide personally identifiable information through
          the Application and/or Services without their permission. If you have
          reason to believe that a child has provided personally identifiable
          information to us through the Application and/or Services, please
          contact us. You must also be at least 16 years of age to consent to
          the processing of your personally identifiable information in your
          country (in some countries we may allow your parent or guardian to do
          so on your behalf).
        </Text>

        <Heading
          as='h2'
          size='lg'
          mt={6}
          mb={4}
        >
          Changes to This Privacy Policy
        </Heading>
        <Text>
          We may update our Privacy Policy from time to time. Thus, you are
          advised to review this page periodically for any changes. We will
          notify you of any changes by posting the new Privacy Policy on this
          page.
        </Text>

        <Text mt={6}>This policy is effective as of 2023-09-07</Text>

        <Heading
          as='h2'
          size='lg'
          mt={6}
          mb={4}
        >
          Contact Us
        </Heading>
        <Text>
          If you have any questions or suggestions about our Privacy Policy, do
          not hesitate to{' '}
          <Link href='mailto:resadmin@resonate.com.au'>contact us</Link> at
          resadmin@resonate.com.au.
        </Text>

        <Divider my='6' />
      </Box>
    </Box>
  )
}

export default Landing
