import React from 'react'
import PropTypes from 'prop-types'
import styleSpec from '@mapbox/mapbox-gl-style-spec/style-spec'
import InputBlock from '../inputs/InputBlock'
import StringInput from '../inputs/StringInput'
import NumberInput from '../inputs/NumberInput'

class TileJSONSourceEditor extends React.Component {
  static propTypes = {
    source: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    return <InputBlock label={"TileJSON URL"} doc={styleSpec.latest.source_vector.url.doc}>
      <StringInput
        value={this.props.source.url}
        onChange={url => this.props.onChange({
          ...this.props.source,
          url: url
        })}
      />
    </InputBlock>
  }
}

class TileURLSourceEditor extends React.Component {
  static propTypes = {
    source: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  changeTileUrl(idx, value) {
    const tiles = this.props.source.tiles.slice(0)
    tiles[idx] = value
    this.props.onChange({
      ...this.props.source,
      tiles: tiles
    })
  }

  renderTileUrls() {
    const prefix = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th']
    const tiles = this.props.source.tiles || []
    return tiles.map((tileUrl, tileIndex) => {
      return <InputBlock key={tileIndex} label={prefix[tileIndex] + " Tile URL"} doc={styleSpec.latest.source_vector.tiles.doc}>
        <StringInput
          value={tileUrl}
          onChange={this.changeTileUrl.bind(this, tileIndex)}
        />
      </InputBlock>
    })
  }

  render() {
    return <div>
      {this.renderTileUrls()}
      <InputBlock label={"Min Zoom"} doc={styleSpec.latest.source_vector.minzoom.doc}>
        <NumberInput
          value={this.props.source.minzoom || 0}
          onChange={minzoom => this.props.onChange({
            ...this.props.source,
            minzoom: minzoom
          })}
        />
      </InputBlock>
      <InputBlock label={"Max Zoom"} doc={styleSpec.latest.source_vector.maxzoom.doc}>
        <NumberInput
          value={this.props.source.maxzoom || 22}
          onChange={maxzoom => this.props.onChange({
            ...this.props.source,
            maxzoom: maxzoom
          })}
        />
      </InputBlock>
  </div>

  }
}

class GeoJSONSourceEditor extends React.Component {
  static propTypes = {
    source: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    return <InputBlock label={"GeoJSON Data"} doc={styleSpec.latest.source_geojson.data.doc}>
      <StringInput
        value={this.props.source.data}
        onChange={data => this.props.onChange({
          ...this.props.source,
          data: data
        })}
      />
    </InputBlock>
  }
}

class SourceTypeEditor extends React.Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    source: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const commonProps = {
      source: this.props.source,
      onChange: this.props.onChange,
    }
    switch(this.props.mode) {
      case 'geojson': return <GeoJSONSourceEditor {...commonProps} />
      case 'tilejson_vector': return <TileJSONSourceEditor {...commonProps} />
      case 'tilexyz_vector': return <TileURLSourceEditor {...commonProps} />
      case 'tilejson_raster': return <TileJSONSourceEditor {...commonProps} />
      case 'tilexyz_raster': return <TileURLSourceEditor {...commonProps} />
      default: return null
    }
  }
}

export default SourceTypeEditor
