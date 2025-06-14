import { Autocomplete, Box, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import type { ICountryType } from '@utils/interfaces/countryType';
import { countries } from '@utils/constants/countries';
import type { AppDispatch } from 'src/store';
import { fillDetails, selectCountry, selectGender } from '../registerSlice';
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
  const [blurred, setBlurred] = useState(false);
  const selectedCountry = useSelector(selectCountry);
  const onCountryChange = (
    e: React.SyntheticEvent,
    newVal: ICountryType | null
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      fillDetails({ newValue: newVal ? newVal : null, type: 'EDIT_COUNTRY' })
    );
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
          error={blurred && selectedCountry === null}
          required
          label={t('selectCountry')}
          onBlur={() => setBlurred(true)}
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
      dispatch(fillDetails({ newValue: newVal, type: 'EDIT_GENDER' }));
    } else {
      dispatch(fillDetails({ newValue: null, type: 'EDIT_GENDER' }));
    }
  };
  const { t } = useTranslation();
  const [blurred, setBlurred] = useState(false);
  const selectorGender = useSelector(selectGender);
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
            error={blurred && selectorGender === null}
            required
            value={selectorGender}
            helperText={
              blurred && selectorGender === null ? t('genderIsRequired') : ''
            }
            label={t('chooseGender')}
            onBlur={() => {
              setBlurred(true);
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
        dispatch(fillDetails({ newValue: avatarData, type: 'EDIT_AVATAR' }));
      }
    } catch (error) {
      console.error('fail to restore avatar:', error);
    }
  }, [dispatch]);
  const handleUpload = useCallback(
    (file: File) => {
      dispatch(
        fillDetails({
          newValue: {
            id: `${Date.now()}`,
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
          },
          type: 'EDIT_AVATAR',
        })
      );

      const avatarData = {
        id: `${Date.now()}`,
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      };

      dispatch(fillDetails({ newValue: avatarData, type: 'EDIT_AVATAR' }));
      try {
        localStorage.setItem('avatarMetadata', JSON.stringify(avatarData));
      } catch (error) {
        console.error('fail to cache:', error);
      }
    },
    [dispatch]
  );
  const render = useCallback(() => {
    return (
      <div className='self-center'>
        <UploadAvatars onUpload={handleUpload} />
      </div>
    );
  }, [avatar]);

  return render();
}
