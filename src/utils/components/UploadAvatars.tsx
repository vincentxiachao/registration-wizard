import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';

export default function UploadAvatars({
  onUpload,
}: {
  onUpload: (file: File) => void;
}) {
  const [avatarSrc, setAvatarSrc] = React.useState<string | undefined>(
    undefined
  );
  React.useEffect(() => {
    const avatarUrl = localStorage.getItem('avatar');
    if (avatarUrl) {
      setAvatarSrc(avatarUrl);
    }
  }, []);
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setAvatarSrc(result);
        localStorage.setItem('avatar', result);
      };
      onUpload(file);
      reader.readAsDataURL(file);
    }
  };

  return (
    <ButtonBase
      component='label'
      role={undefined}
      tabIndex={-1}
      aria-label='Avatar image'
      sx={{
        borderRadius: '60px',
        '&:has(:focus-visible)': {
          outline: '2px solid',
          outlineOffset: '2px',
        },
      }}
    >
      <Avatar
        alt='Upload new avatar'
        sx={{ width: 80, height: 80 }}
        src={avatarSrc}
      />
      <input
        type='file'
        accept='image/*'
        style={{
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px',
        }}
        onChange={handleAvatarChange}
      />
    </ButtonBase>
  );
}
