import { Autocomplete, Avatar, Box, Stack, TextField } from '@mui/material';
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
  const CountrySelect = useCallback(() => {
    return countrySelect();
  }, [selectCountry]);
  const GenderSelect = useCallback(() => {
    return genderSelect();
  }, [seletGender]);
  return (
    <>
      <Box className='flex h-full flex-col content-center justify-center'>
        <Stack className='w-1/2' spacing={2}>
          <ProfilePicture />
          <CountrySelect />
          <GenderSelect />
        </Stack>
      </Box>
    </>
  );
};
function countrySelect() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [blured, setBlured] = useState(false);
  const selectedCountry = useSelector(selectCountry);
  const onCountryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newVal: { code: string }
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
        option ? `${option.label} (${option.code}) +${option.phone}` : ''
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
function genderSelect() {
  const dispatch = useDispatch<AppDispatch>();
  const onGenderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newVal: { label: string; id: number }
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
    { label: t('Male'), id: 0 },
    { label: t('Female'), id: 1 },
    { label: t('I prefer not to say'), id: 2 },
  ];

  return (
    <>
      <Autocomplete
        options={options}
        onChange={(e, newVal) => {
          onGenderChange(e, newVal);
        }}
        value={selectorGender}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            error={blured && selectorGender === null}
            required
            value={selectorGender}
            helperText={
              blured && selectorGender === null ? t('Gender is required') : ''
            }
            label={t('Choose a gender')}
            onBlur={(e) => {
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
  const vatar = useSelector(selectedAvatar);
  const [cachedAvatar, setCachedAvatar] = useState<File | null>(null);
  useEffect(() => {
    try {
      const cachedAvatar = localStorage.getItem('avatarMetadata');
      if (cachedAvatar) {
        const avatarData = JSON.parse(cachedAvatar);
        dispatch(fillAvatar(avatarData));
      }
    } catch (error) {
      console.error('恢复头像元数据失败:', error);
    }
  }, []);
  const render = useCallback(() => {
    return (
      <div className='self-center'>
        <UploadAvatars onUpload={handleUpload} />
      </div>
    );
  }, [vatar]);
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
