import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
  Paper,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import {
  CgPlayListAdd as DescriptionIcon,
  CgMathPercent as NutritionIcon,
} from 'react-icons/cg'
import {
  BiMessageMinus as ChangesIcon,
  BiMessageAdd as UpgradesIcon,
} from 'react-icons/bi'
import { VscVersions as SizesIcon } from 'react-icons/vsc'
import { BsBasket as IngredientsIcon } from 'react-icons/bs'
import { TiWarningOutline as WarningsIcon } from 'react-icons/ti'
import ClampLines from 'react-clamp-lines'
import { t } from 'i18next'
import { useKitchenById } from 'hooks/kitchens'

import DishRecipeTypeChips from './DishRecipeTypeChips'
import AskForChangesBtn from './AskForChangesBtn'
import ChangesInfo from './ChangesInfo'
import DescriptionInfo from './DescriptionInfo'
import IngredientsInfo from './IngredientsInfo'
import { Add as AddIcon } from '@mui/icons-material'
import { useDinerOrder } from 'contexts/order'

const ActionButton = styled(IconButton)({
  width: 60,
  height: 60,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export default function FoodDish({ data }) {
  const theme = useTheme()
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)

  const [expandedMoreInfo, setExpandedMoreInfo] = React.useState()
  const [selectedComponents, setSelectedComponents] = React.useState({
    choice: [],
    sideDish: [],
    addableComponents: [],
  })

  const dishExcludableComponentsFilteredOut = data?.recipe?.excludable?.filter(
    (component) => component.isFilteredOut
  )

  const handleSelect =
    (recipeType, options = { exclusive: false }) =>
      (componentId) => {
        setSelectedComponents((currSelectedComponents) => ({
          ...currSelectedComponents,
          // eslint-disable-next-line no-nested-ternary
          [recipeType]: currSelectedComponents[recipeType].includes(componentId)
            ? options.exclusive
              ? [componentId]
              : currSelectedComponents[recipeType].filter(
                (c) => c !== componentId
              )
            : [...currSelectedComponents[recipeType], componentId],
        }))
      }

  const handleClickMoreInfoBtn = (moreInfoTab) => () => {
    if (expandedMoreInfo !== moreInfoTab) {
      setExpandedMoreInfo(moreInfoTab)
    } else {
      setExpandedMoreInfo()
    }
  }

  return (
    <Paper
      elevation={5}
      sx={{
        width: '100%',
        maxWidth: 750,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        marginBottom: theme.spacing(2),
        flex: 1,
      }}
    >
      <Card
        sx={{
          width: '100%',
          opacity: data.isMainDishFilteredOut ? 0.2 : 1,
          pointerEvents: data.isMainDishFilteredOut ? 'none' : 'all',
        }}
        elevation={0}
      >
        <Box>
          <CardHeader
            sx={{
              textAlign: 'initial',
              flex: 1,
              alignItems: 'flex-start',
              paddingBottom: 0,
            }}
            title={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6">{data.name}</Typography>

                {data.price && (
                  <Typography
                    variant="h6"
                    sx={{
                      marginLeft: theme.spacing(1),
                    }}
                  >
                    {`${data.price}${kitchen?.currency}`}
                  </Typography>
                )}
              </Box>
            }
          />

          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                flex: 1,
                textAlign: 'start',
                padding: theme.spacing(2),
                paddingTop: 0,
              }}
            >
              <ClampLines
                text={data.description || ''}
                id={data.id}
                lines={10}
                ellipsis="..."
                moreText="Expand"
                lessText="Collapse"
                className="custom-class"
                innerElement="p"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              {data?.image?.url && (
                <CardMedia
                  component="img"
                  sx={{
                    width: 110,
                    height: 110,
                  }}
                  image={data?.image?.url}
                  alt=""
                />
              )}
              {dishExcludableComponentsFilteredOut?.length > 0 && (
                <AskForChangesBtn
                  dishExcludableComponentsFilteredOut={
                    dishExcludableComponentsFilteredOut
                  }
                />
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ marginTop: theme.spacing(1) }}>
          {data.recipe?.choice?.length > 0 && (
            <>
              <Typography
                sx={{ textAlign: 'start', margin: `0 ${theme.spacing(1)}` }}
              >
                {t('choice')}:
              </Typography>
              {data.recipe?.choice.map((choices, index) => (
                <DishRecipeTypeChips
                  key={index}
                  data={choices}
                  selectedComponents={selectedComponents.choice}
                  onSelect={handleSelect('choice', { exclusive: true })}
                />
              ))}
            </>
          )}

          {data.recipe?.sideDish?.length > 0 && (
            <DishRecipeTypeChips
              data={data.recipe.sideDish}
              label={t('sidedish')}
              selectedComponents={selectedComponents.sideDish}
              onSelect={handleSelect('sideDish', { exclusive: false })}
            />
          )}
        </Box>

        {data?.sizes?.length > 0 && (
          <Box
            sx={{
              backgroundColor: theme.palette.grey[200],
              padding: theme.spacing(1),
              alignItems: 'center',
              marginBottom: theme.spacing(1),
              display: 'flex',
            }}
          >
            {data.sizes.map((size) => (
              <Box
                key={size.type}
                sx={{
                  borderRadius: 50,
                  margin: `0 ${theme.spacing(1)}`,
                  display: 'flex',
                  backgroundColor: 'white',
                  padding: '4px 8px',
                }}
              >
                <Typography sx={{ margin: 0 }}>
                  {t(`size_type_${size.type}`)}
                </Typography>

                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ margin: `0 ${theme.spacing(1)}` }}
                />

                <Typography sx={{ margin: 0 }}>{`${kitchen.currency}${
                  (Number(size.price) || 0) + Number(data.price)
                }`}</Typography>
              </Box>
            ))}
          </Box>
        )}

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
      </Card>
    </Paper>
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

function DinerOrderController({ data }) {
  const dinerOrder = useDinerOrder()
  const handleClickAddDishToOrder = () => {
    dinerOrder.setOrder((currOrder) => [...currOrder, data])
  }

  return (
    <Button
      endIcon={<AddIcon />}
      variant="contained"
      onClick={handleClickAddDishToOrder}
      sx={{
        width: 110,
        borderRadius: 2,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        marginLeft: 'auto',
        // height: 60,
        // fontSize: '1.15rem',
      }}
    >
      {t('add')}
    </Button>
  )
}
