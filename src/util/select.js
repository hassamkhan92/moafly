/*
 * @Author: zulezhe
 * @Date: 2022-01-15 22:03:48
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-11-25 21:30:48
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
/**
 * 卖房流程下拉框数据
 */
let selectOption = {
  propertySubtypeList: [
    'Single Family Residence',
    'Condominium',
    'Stock Cooperative',
    'Townhouse',
    'Manufactured On Land',
    'Cabin',
    'Own Your Own',
    'Timeshare',
    'Loft',
    'Commercial/Residential',
    'Studio',
    'Deeded Parking',
    'Duplex',
    'Quadruplex',
    'Triplex',
    'Boat Slip'
  ],
  beds: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
  commonInserts: ['None', 'Community Apartment', 'Condominium', 'Planned Development', 'Stock Cooperative', 'Timeshare'],
  levels: ['One', 'Two', 'Three Or More', 'Multi/Split'],
  seniorCommuns: ['Yes', 'No'],
  structureTypes: [
    'None',
    'Cabin',
    'Dock',
    'Duplex',
    'Flex',
    'Hotel/Motel',
    'House',
    'Industrial',
    'Manufactured House',
    'Mixed Use',
    'Multi Family',
    'Office',
    'Quadruplex',
    'Retail',
    'Triplex',
    'Warehouse'
  ],
  baths: [
    '0.5',
    '1',
    '1.5',
    '2',
    '2.5',
    '3',
    '3.5',
    '4',
    '4.5',
    '5',
    '5.5',
    '6',
    '6.5',
    '7',
    '7.5',
    '8',
    '8.5',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
    '12.5',
    '13',
    '13.5',
    '14',
    '14.5',
    '15',
    '15.5',
    '16',
    '16.5',
    '17',
    '17.5',
    '18',
    '18.5',
    '19',
    '19.5',
    '20'
  ],
  collingOptions: [
    'None',
    'Central Air',
    'Dual',
    'Ductless',
    'Electric',
    'ENERGY STAE Qualified',
    'Evaporative Cooling',
    'Gas',
    'Heat Pump',
    'High Efficency',
    'Humidity Control',
    'SEER Rated 13-15',
    'SEER Rated 16+',
    'See Remarks',
    'Wall/Window Unit(s)',
    'Whole House Fan',
    'Zoned'
  ],
  laundryOptions: [
    'None',
    'Common Area',
    'Community',
    'Dryer lncluded',
    'Electric Dryer Hookup',
    'Gas & Electric Dryer Hookup',
    'Gas Dryer Hookup',
    'In Carport',
    'In Closet',
    'In Garage',
    'In Kitchen',
    'Individual Room',
    'Inside',
    'Laundry Chute',
    'Upper Level',
    'Outside',
    'Propane Dryer Hookup',
    'See Remarks',
    'Stackable',
    'Washer Hookup',
    'Washer Hookup',
    'Washer Included'
  ],
  roomTypesOptions: [
    'All Bedrooms Down',
    'All Bedrooms Up',
    'Art Studio',
    'Atrium',
    'Attic',
    'Basement',
    'Bonus Room',
    'Center Hall',
    'Converted Bedroom',
    'Dance Studio',
    'Den',
    'Dressing Area',
    'Entry',
    'Exercise Room',
    'Family Room',
    'Formal Entry',
    'Foyer',
    'Galley Kitchen',
    'Game Room',
    'Great Room',
    "Guest/Maid's Quarters",
    'Home Theatre',
    'Jack & Jill',
    'Kitchen',
    'Laundry',
    'Library',
    'Living Room',
    'Loft',
    'Main Floor Bedroom',
    'Main Floor Master Bedroom',
    'Master Bathroom',
    'Master Bedroom',
    'Master Suite',
    'Media Room',
    'Multi-Level Bedroom',
    'Office',
    'Projection',
    'Recreation',
    'Retreat',
    'Sauna',
    'See Remarks',
    'Separate Family Room',
    'Sound Studio',
    'Sun',
    'Two Masters',
    'Utility Room',
    'Walk-In Closet',
    'Walk-In Pantry',
    'Wine Cellar',
    'Workshop'
  ],
  poolFeaturesOptions: [
    'None',
    'Private',
    'Association',
    'Community',
    'Above Ground',
    'Black Bottom',
    'Diving Board',
    'Exercise Pool',
    'Fenced',
    'Fiberglass',
    'Filtered',
    'Gunite',
    'Heated',
    'Heated Passively',
    'Electric Heat',
    'Gas Heat',
    'Heated with Propane',
    'In Ground',
    'Indoor',
    'Lap',
    'Infinity',
    'No Permits',
    'Pebble',
    'Permits',
    'Pool Cover',
    'Roof Top',
    'Salt Water',
    'See Remarks',
    'Solar Heat',
    'Tile',
    'Vinyl',
    'Waterfall'
  ],
  commonWallsOptions: ['1 Common Wall', '2+ Common Walls', 'End Unit', 'No Common Walls', 'No One Above', 'No One Below'],
  communityFeaturesOptions: [
    'Biking',
    'BLM/National Forest',
    'Curbs',
    'Dog Park',
    'Fishing',
    'Foothills',
    'Golf',
    'Hiking',
    'Gutters',
    'Lake',
    'Horse Trails',
    'Park',
    'Hunting',
    'Watersports',
    'Military Land',
    'Mountainous',
    'Preserve/Public Land',
    'Ravine',
    'Stable(s)',
    'Rural',
    'Sidewalks',
    'Storm Drains',
    'Street Lights',
    'Suburban',
    'Urban',
    'Valley'
  ],
  waterSourcesOptions: ['None', 'Agricultural Well', 'Cistern', 'Other', 'Private', 'Public', 'See Remarks', 'Shared Well', 'Well'],
  firePlaceOptions: [
    'None',
    'Bath',
    'Bonus Room',
    'Den',
    'Dining Room',
    'Family Room',
    'Game Room',
    'Guest House',
    'Kitchen',
    'Library',
    'Living Room',
    'Circulating',
    'Master Bedroom',
    'Master Retreat',
    'Outside',
    'Patio',
    'Electric',
    'Gas',
    'Gas Starter',
    'Pellet Stove',
    'Propane',
    'Wood Burning',
    'Wood Stove Insert',
    'Blower Fan',
    'Circular',
    'Decorative',
    'Fire Pit',
    'Free Standing',
    'Great Room',
    'Heatilator',
    'Masonry',
    'Raised Hearth',
    'Zero Clearance',
    'See Through',
    'Two Way',
    'See Remarks'
  ],
  viewsOptions: [
    'None',
    'Back Bay',
    'Dunes',
    'Bay',
    'Bluff',
    'Bridge(s)',
    'Canal',
    'Canyon',
    'Catalina',
    'City Lights',
    'Coastline',
    'Courtyard',
    'Creek/Stream',
    'Desert',
    'Golf Course',
    'Harbor',
    'Hills',
    'Lake',
    'Landmark',
    'Marina',
    'Meadow',
    'Mountain(s)',
    'Neighborhood',
    'Ocean',
    'Orchard',
    'Panoramic',
    'Park/Greenbelt',
    'Pasture',
    'Peek-A-Boo',
    'Pier',
    'Pond',
    'Pool',
    'Reservoir',
    'River',
    'Rocks',
    'See Remarks',
    'Trees/Woods',
    'Valley',
    'Vincent Thomas Bridge',
    'Vineyard',
    'Water',
    'White Water'
  ],
  lotFeaturesOptions: [
    '0-1 Unit/Acre',
    '2-5 Units/Acre',
    '6-10 Units/Acre',
    '11-15 Units/Acre',
    '16-20 Units/Acre',
    '21-25 Units/Acre',
    '26-30 Units/Acre',
    '31-35 Units/Acre',
    '36-40 Units/Acre',
    'Agricultural',
    'Agricultural - Dairy',
    'Agricultural - Other',
    'Agricultural - Row/Crop',
    'Agricultural - Tree/Orchard',
    'Agricultural - Vine/Vineyard',
    'Back Yard',
    'Bluff',
    'Close to Clubhouse',
    'Corner Lot',
    'Corners Marked',
    'Cul-De-Sac',
    'Desert Back',
    'Desert Front',
    'Sloped Down',
    'Front Yard',
    'Garden',
    'Gentle Sloping',
    'Greenbelt',
    'Horse Property',
    'Horse Property Improved',
    'Horse Property Unimproved',
    'Landscaped',
    'Level with Street',
    'Lot 10000-19999 Sqft',
    'Lot 20000-39999 Sqft',
    'Lot 6500-9999',
    'Lot Over 40000 Sqft',
    'Flag Lot',
    'Irregular Lot',
    'Rectangular Lot',
    'Level',
    'Misting System',
    'Near Public Transit',
    'No Landscaping',
    'On Golf Course',
    'Over 40 Units/Acre',
    'Park Nearby',
    'Pasture',
    'Patio Home',
    'Paved',
    'Percolate',
    'Ranch',
    'Rocks',
    'Rolling Slope',
    'Secluded',
    'Sprinkler System',
    'Sprinklers Drip System',
    'Sprinklers In Front',
    'Sprinklers In Rear',
    'Sprinklers Manua',
    'Sprinklers None',
    'Sprinklers On Side On Sidee',
    'Sprinklers Timer',
    'Steep Slope',
    'Tear Down',
    'Treed Lot',
    'Up Slope from Street',
    'Utilities - Overhead',
    'Value In Land',
    'Walkstreet',
    'Yard',
    'Zero Lot Line'
  ],
  sewerOptions: [
    'None',
    'Aerobic Septic',
    'Cesspool',
    'Conventional Septic',
    'Engineered Septic',
    'Holding Tank',
    'Mound Septic',
    'Other',
    'Perc Test On File',
    'Perc Test Required',
    'Private Sewer',
    'Public Sewer',
    'Septic Type Unknown',
    'Sewer Applied for Permit',
    'Sewer Assessments',
    'Sewer On Bond',
    'Sewer Paid',
    'Shared Septic',
    'Soils Analysis Septic',
    'Unknown'
  ]
};
export default selectOption;
