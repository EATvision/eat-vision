import React from 'react'
import {
  CardActions,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  styled,
  Typography,
} from '@mui/material'
import {
  BiMessageMinus as ChangesIcon,
  BiMessageAdd as UpgradesIcon,
} from 'react-icons/bi'
import { VscVersions as SizesIcon } from 'react-icons/vsc'
import { BsBasket as IngredientsIcon } from 'react-icons/bs'
import { TiWarningOutline as WarningsIcon } from 'react-icons/ti'
import {
  CgPlayListAdd as DescriptionIcon,
  CgMathPercent as NutritionIcon,
} from 'react-icons/cg'

import DinerOrderController from './DinerOrderController'
import DescriptionInfo from './DescriptionInfo'
import ChangesInfo from './ChangesInfo'
import IngredientsInfo from './IngredientsInfo'
import { t } from 'i18next'

const ActionButton = styled(IconButton)({
  minWidth: 60,
  height: 60,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 0,
})

export default function DishExtraInfo({ data }) {
  const [expandedMoreInfo, setExpandedMoreInfo] = React.useState()

  const handleClickMoreInfoBtn = (moreInfoTab) => () => {
    if (expandedMoreInfo !== moreInfoTab) {
      setExpandedMoreInfo(moreInfoTab)
    } else {
      setExpandedMoreInfo()
    }
  }

  return (
    <>
      {(data.longDescription ||
        data.recipe.putaside.length > 0 ||
        data.recipe.excludable.length > 0 ||
        data.recipe.nutrition ||
        data.recipe.updates ||
        data.sizes.length > 0 ||
        data.recipe.mandatory.length > 0 ||
        data.warnings) && <Divider />}
      <CardActions disableSpacing sx={{ padding: 0 }}>
        {data.longDescription && (
          <ActionButton
            color={expandedMoreInfo === 'description' ? 'primary' : 'default'}
            onClick={handleClickMoreInfoBtn('description')}
          >
            <DescriptionIcon />
            <Typography sx={{ fontSize: 12 }}>{t('description')}</Typography>
          </ActionButton>
        )}

        {(data.recipe.putaside.length > 0 ||
          data.recipe.excludable.length > 0) && (
          <ActionButton
            color={expandedMoreInfo === 'changes' ? 'primary' : 'default'}
            onClick={handleClickMoreInfoBtn('changes')}
          >
            <ChangesIcon />
            <Typography sx={{ fontSize: 12 }}>{t('changes')}</Typography>
          </ActionButton>
        )}

        {data.recipe.nutrition && (
          <ActionButton
            color={expandedMoreInfo === 'nutrition' ? 'primary' : 'default'}
            onClick={handleClickMoreInfoBtn('nutrition')}
          >
            <NutritionIcon />
            <Typography sx={{ fontSize: 12 }}>{t('nutrition')}</Typography>
          </ActionButton>
        )}

        {data.recipe.updates && (
          <ActionButton
            color={expandedMoreInfo === 'upgrades' ? 'primary' : 'default'}
            onClick={handleClickMoreInfoBtn('upgrades')}
          >
            <UpgradesIcon />
            <Typography sx={{ fontSize: 12 }}>{t('upgrades')}</Typography>
          </ActionButton>
        )}

        {data.dishType !== 'drink' && data.sizes?.length > 0 && (
          <ActionButton
            color={expandedMoreInfo === 'sizes' ? 'primary' : 'default'}
            onClick={handleClickMoreInfoBtn('sizes')}
          >
            <SizesIcon />
            <Typography sx={{ fontSize: 12 }}>{t('sizes')}</Typography>
          </ActionButton>
        )}

        {data.dishType !== 'drink' && data.recipe.mandatory.length > 0 && (
          <ActionButton
            color={expandedMoreInfo === 'ingredients' ? 'primary' : 'default'}
            onClick={handleClickMoreInfoBtn('ingredients')}
          >
            <IngredientsIcon />
            <Typography sx={{ fontSize: 12 }}>{t('ingredients')}</Typography>
          </ActionButton>
        )}

        {data.warnings && (
          <ActionButton
            color={expandedMoreInfo === 'warnings' ? 'primary' : 'default'}
            onClick={handleClickMoreInfoBtn('warnings')}
          >
            <WarningsIcon />
            <Typography sx={{ fontSize: 12 }}>{t('warnings')}</Typography>
          </ActionButton>
        )}

        <DinerOrderController data={data} />
      </CardActions>

      <Divider />
      <Collapse in={Boolean(expandedMoreInfo)} timeout="auto" unmountOnExit>
        <CardContent sx={{ textAlign: 'start' }}>
          <ExpandedInfo type={expandedMoreInfo} data={data} />
        </CardContent>
      </Collapse>
    </>
  )
}

function ExpandedInfo({ type, data }) {
  switch (type) {
  case 'description':
    return <DescriptionInfo data={data} />
  case 'changes': {
    return <ChangesInfo data={data} />
  }
  case 'ingredients': {
    return <IngredientsInfo data={data} />
  }

  default:
    return null
  }
}
