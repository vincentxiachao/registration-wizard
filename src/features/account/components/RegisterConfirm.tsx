import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  SvgIcon,
  Typography,
} from '@mui/material';
import { selectRegisterState } from '../registerSlice';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const RegisterConfirm = () => {
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const avatarUrl = localStorage.getItem('avatar');
    if (avatarUrl) {
      setAvatarSrc(avatarUrl);
    }
  }, []);
  const registerInfo = useSelector(selectRegisterState);
  const { t } = useTranslation();
  const { firstName, lastName, dateOfBirth, gender, country, email } =
    registerInfo.registerInfo;
  const password = registerInfo.password;
  const sections = [
    {
      title: t('basicInfo'),
      contents: [
        { name: t('firstName'), value: firstName },
        { name: t('lastName'), value: lastName },
        { name: t('dateOfBirth'), value: dateOfBirth },
      ],
    },
    {
      title: t('details'),
      contents: [
        { name: t('country'), value: country?.label || '' },
        { name: t('gender'), value: gender?.label || '' },
      ],
    },
    {
      title: t('account'),
      contents: [
        { name: t('email'), value: email },
        { name: t('password'), value: password, isPassword: true },
      ],
    },
  ];
  return (
    <>
      <Box className='flex h-full flex-col content-center justify-center'>
        <Avatar
          src={avatarSrc}
          alt='Payoneer'
          sx={{ width: 70, height: 70 }}
          className='self-center mb-6'
        />

        {sections.map((section) => (
          <AccordionNode
            key={section.title}
            contents={section.contents}
            accordionTitle={section.title}
          ></AccordionNode>
        ))}
      </Box>
    </>
  );
};

const AccordionNode = (props: {
  accordionTitle: string;
  contents: { name: string; value: string; isPassword?: boolean }[];
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1-content'
          id={props.accordionTitle}
        >
          <Typography component='span'>{props.accordionTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.contents.map((content) => {
            return content.isPassword ? (
              <Box className='flex flex-col' key={content.name}>
                <Typography
                  variant='body2'
                  key={content.name}
                  className={content.isPassword ? 'inline' : ''}
                >
                  {content.name}: {showPassword ? content.value : '********'}
                </Typography>
                <SvgIcon
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  className='cursor-pointer inline'
                  aria-label={`password visibility, ${!showPassword ? 'hide password' : 'show password'}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </SvgIcon>
              </Box>
            ) : (
              <Typography key={content.name} variant='body2'>
                {content.name}: {content.value}
              </Typography>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
