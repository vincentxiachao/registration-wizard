import { Autocomplete, Box, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import type { ICountryType } from '@utils/interfaces/countryType';
import { countries } from '@utils/constants/countries';
import type { AppDispatch } from 'src/store';
import {
  fillAvatar,
  fillCountry,
  fillGender,
  selectCountry,
  seletGender,
} from '../registerSlice';
import { useCallback, useEffect, useState } from 'react';
import UploadAvatars from '@utils/components/UploadAvatars';
import { selectedAvatar } from '../registerSlice';
export const RegisterDetails = () => {
  return (
    <>
      <Box className='flex h-full flex-col items-center justify-center'>
        <Stack className='w-1/2' spacing={6}>
          <ProfilePicture />
          <CountrySelect />
          <GenderSelect />
        </Stack>
      </Box>
    </>
  );
};
function CountrySelect() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [blured, setBlured] = useState(false);
  const selectedCountry = useSelector(selectCountry);
  const onCountryChange = (
    e: React.SyntheticEvent,
    newVal: ICountryType | null
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(fillCountry(newVal ? newVal : null));
  };

  return (
    <Autocomplete
      options={countries}
      value={selectedCountry}
      getOptionLabel={(option: ICountryType) =>
        option ? `${option.label} (${option.code})` : ''
      }
      isOptionEqualToValue={(option, value) => option.code === value.code}
      onChange={(e, newVal) => {
        onCountryChange(e, newVal);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={blured && selectedCountry === null}
          required
          label={t('selectCountry')}
          onBlur={() => setBlured(true)}
        />
      )}
    />
  );
}
function GenderSelect() {
  const dispatch = useDispatch<AppDispatch>();
  const onGenderChange = (
    e: React.SyntheticEvent,
    newVal: { label: string; id: number } | null
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (newVal) {
      dispatch(fillGender(newVal));
    } else {
      dispatch(fillGender(null));
    }
  };
  const { t } = useTranslation();
  const [blured, setBlured] = useState(false);
  const selectorGender = useSelector(seletGender);
  const options = [
    { label: t('male'), id: 0 },
    { label: t('female'), id: 1 },
    { label: t('notToSay'), id: 2 },
  ];

  return (
    <>
      <Autocomplete
        options={options}
        onChange={(e, newVal) => {
          onGenderChange(e, newVal);
        }}
        getOptionLabel={(option) =>
          option ? `${t('selectGender_' + option.id)} ` : ''
        }
        value={selectorGender}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            error={blured && selectorGender === null}
            required
            value={selectorGender}
            helperText={
              blured && selectorGender === null ? t('genderIsRequired') : ''
            }
            label={t('chooseGender')}
            onBlur={() => {
              setBlured(true);
            }}
          />
        )}
      />
    </>
  );
}
function ProfilePicture() {
  const dispatch = useDispatch<AppDispatch>();
  const avatar = useSelector(selectedAvatar);
  useEffect(() => {
    try {
      const cachedAvatar = localStorage.getItem('avatarMetadata');
      if (cachedAvatar) {
        const avatarData = JSON.parse(cachedAvatar);
        dispatch(fillAvatar(avatarData));
      }
    } catch (error) {
      console.error('fail to restore avatar:', error);
    }
  }, []);
  const render = useCallback(() => {
    return (
      <div className='self-center'>
        <UploadAvatars onUpload={handleUpload} />
      </div>
    );
  }, [avatar]);

  const handleUpload = (file: File) => {
    dispatch(
      fillAvatar({
        id: `${Date.now()}`,
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      })
    );

    const avatarData = {
      id: `${Date.now()}`,
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
    };

    dispatch(fillAvatar(avatarData));

    try {
      localStorage.setItem('avatarMetadata', JSON.stringify(avatarData));
    } catch (error) {
      console.error('fail to cache:', error);
    }
  };
  return render();
}
